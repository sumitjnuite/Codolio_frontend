import React, { useEffect, useState } from "react";
import PopupModal from "../Components/PopupModal";
import { ReactComponent as DeleteIcon } from "../assets/deleteIcon.svg";
import { ReactComponent as SearchIcon } from "../assets/searchIcon.svg";

import PieChart from "../Components/PieChart";
import { Chart as ChartJS, ArcElement, Legend, Title, Tooltip } from "chart.js";
import MonthNavigator from "../Components/MonthNavigator";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const initialCounts = {
    IncomeAmount: 0,
    ExpenseAmount: 0,
    BonusCnt: 0,
    EducationCnt: 0,
    EntertainmentCnt: 0,
    FoodCnt: 0,
    FreelanceCnt: 0,
    GiftCnt: 0,
    HealthcareCnt: 0,
    InvestmentCnt: 0,
    RentCnt: 0,
    SalaryCnt: 0,
    ShoppingCnt: 0,
    TransportationCnt: 0,
    TravelCnt: 0,
    UtilitiesCnt: 0,
  };

  const [counts, setCounts] = useState(initialCounts);

  const [typeData, setTypeData] = useState({
    labels: ["Bonus", "Salary"],
    datasets: [
      {
        label: "Category",
        data: [0, 0],
        backgroundColor: ["rgba(187, 247, 208,1)", "rgb(255, 99, 132)"],
      },
    ],
  });

  const [categoryData, setCategoryData] = useState({
    labels: [
      "Education",
      "Entertainment",
      "Food",
      "Freelance",
      "Gift",
      "Healthcare",
      "Investment",
      "Rent",
      "Shopping",
      "Transportation",
      "Travel",
      "Utilities",
    ],
    datasets: [
      {
        label: "Transaction Category",
        data: Array(12).fill(0),
        backgroundColor: [
          "#d5f30e",
          "#53d726",
          "#1aab2e",
          "#7ddddd",
          "#5fb7d4",
          "#007ed7",
          "#8399eb",
          "#8e6cef",
          "#c759d0",
          "#ff0000",
          "#ff7300",
          "#ffec01",
        ],
        hoverOffset: 14,
      },
    ],
  });

  //  fetch all the transaction data

  const fetchTransactionData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_URL + `/api/transaction/read`
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        console.log("Error in Reading Data");
        return;
      }
      setTransactionData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  // console.log(transactionData)

  useEffect(() => {
    const filterTransactions = () => {
      const month = selectedDate.getMonth();
      const year = selectedDate.getFullYear();
      const filtered = transactionData?.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const matchesDate =
          transactionDate.getMonth() === month &&
          transactionDate.getFullYear() === year;

        const matchesTitle = searchTitle
          ? transaction.title.toLowerCase().includes(searchTitle.toLowerCase())
          : true;

        const matchesType = searchType ? transaction.type === searchType : true;

        const matchesCategory = searchCategory
          ? transaction.category === searchCategory
          : true;

        return matchesDate && matchesTitle && matchesType && matchesCategory;
      });

      // Sort filtered transactions by date
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFilteredTransactions(filtered);
    };

    filterTransactions();
  }, [transactionData, selectedDate, searchTitle, searchType, searchCategory]);

  useEffect(() => {
    if (filteredTransactions?.length > 0) {
      let updatedCounts = { ...initialCounts };
      filteredTransactions?.forEach((Tdata) => {
        if (Tdata.type === "Income") {
          updatedCounts.IncomeAmount += parseFloat(Tdata.amount);
        } else if (Tdata.type === "Expense") {
          updatedCounts.ExpenseAmount += parseFloat(Tdata.amount);
        }

        switch (Tdata.category) {
          case "Bonus":
            updatedCounts.BonusCnt += 1;
            break;
          case "Education":
            updatedCounts.EducationCnt += 1;
            break;
          case "Entertainment":
            updatedCounts.EntertainmentCnt += 1;
            break;
          case "Food":
            updatedCounts.FoodCnt += 1;
            break;
          case "Freelance":
            updatedCounts.FreelanceCnt += 1;
            break;
          case "Gift":
            updatedCounts.GiftCnt += 1;
            break;
          case "Healthcare":
            updatedCounts.HealthcareCnt += 1;
            break;
          case "Investment":
            updatedCounts.InvestmentCnt += 1;
            break;
          case "Rent":
            updatedCounts.RentCnt += 1;
            break;
          case "Salary":
            updatedCounts.SalaryCnt += 1;
            break;
          case "Shopping":
            updatedCounts.ShoppingCnt += 1;
            break;
          case "Transportation":
            updatedCounts.TransportationCnt += 1;
            break;
          case "Travel":
            updatedCounts.TravelCnt += 1;
            break;
          case "Utilities":
            updatedCounts.UtilitiesCnt += 1;
            break;
          default:
            break;
        }
      });

      updatedCounts.IncomeAmount = updatedCounts.IncomeAmount.toFixed(2);
      updatedCounts.ExpenseAmount = updatedCounts.ExpenseAmount.toFixed(2);
      setCounts(updatedCounts);
    }
  }, [filteredTransactions]);

  // console.log(counts);

  useEffect(() => {
    setTypeData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [counts.BonusCnt, counts.SalaryCnt],
        },
      ],
    }));

    setCategoryData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [
            counts.EducationCnt,
            counts.EntertainmentCnt,
            counts.FoodCnt,
            counts.FreelanceCnt,
            counts.GiftCnt,
            counts.HealthcareCnt,
            counts.InvestmentCnt,
            counts.RentCnt,
            counts.ShoppingCnt,
            counts.TransportationCnt,
            counts.TravelCnt,
            counts.UtilitiesCnt,
          ],
        },
      ],
    }));
  }, [counts]);

  // console.log("filteredTransactions",filteredTransactions);

  const handleDeleteTransaction = async (id) => {
    await fetch(process.env.REACT_APP_URL + `/api/transaction/delete/` + id, {
      method: "DELETE",
    });

    setFilteredTransactions((prev) => {
      return prev.filter((d) => d._id !== id);
    });
  };

  return (
    <main className="max-w-7xl mx-auto  min-h-[98vh] flex flex-col gap-4 md:gap-4 sm:px-12  py-12 relative overflow-hidden ">
      <MonthNavigator onDateChange={setSelectedDate} />

      {/* Chart */}
      <div className="">
        <div className="flex flex-col lg:flex-row  w-full">
          <div className="flex-1">
            <PieChart chartData={typeData} />
          </div>
          <div className="flex-1">
            <PieChart chartData={categoryData} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 lg:gap-16 my-2">
          <div className="flex-1 flex justify-center gap-2 lg:gap-8  bg-green-200 font-bold text-lg text-green-600 rounded-sm py-2">
            <span>INCOME:</span>
            <span>
              $ {filteredTransactions?.length > 0 ? counts.IncomeAmount : 0}
            </span>
          </div>
          <div className="flex-1 flex justify-center gap-2 lg:gap-8 bg-red-200 font-bold text-lg text-red-600 rounded-sm py-2">
            <span>EXPENCE:</span>
            <span>
              $ {filteredTransactions?.length > 0 ? counts.ExpenseAmount : 0}
            </span>
          </div>
        </div>
      </div>

      {/* filter div */}
      <div className="flex flex-col md:flex-row  gap-4 p-2">
        <div className="flex items-center w-full  md:w-[50%] bg-white rounded-md overflow-hidden px-2">
          <input
            type="text"
            placeholder="Search by title"
            className="w-[100%] pl-2 py-2 outline-none "
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <SearchIcon />
        </div>

        <div className="flex-1 flex gap-4">
          <select
            name="Type"
            id=""
            className="flex-1 px-2 rounded-md outline-none"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="">Type</option>
            <option value="Income">Income</option>
            <option value="Expence">Expence</option>
          </select>

          <select
            name=""
            id=""
            className="flex-1 px-2 rounded-md outline-none"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="Bonus">Bonus</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
            <option value="Freelance">Freelance</option>
            <option value="Gift">Gift</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Investment">Investment</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Shopping">Shopping</option>
            <option value="Transportation">Transportation</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
          </select>

          <select name="" id="" className="flex-1 px-2 rounded-md outline-none"> 
            <option value="">Currency</option>
            <option value="">EUR</option>
            <option value="">GBP</option>
            <option value="">INR</option>
            <option value="">JPY</option>
            <option value="">USD</option>
          </select>
        </div>
      </div>

      {/* listings */}

      {loading && (
        <h3 className=" mt-8 text-center font-bold text-4xl">Loading...</h3>
      )}
      {!loading ? (
        <>
          {filteredTransactions?.length > 0 ? (
            filteredTransactions?.map((data, index) => (
              <div key={index} className="bg-white rounded-lg">
                <div className="flex justify-between border-b-2 py-4 px-8">
                  <div className="flex gap-2">
                    <h3 className="font-semibold">
                      {new Date(data.date).getDate()}
                    </h3>
                    <h3 className="font-semibold bg-slate-200 px-4 rounded-lg">
                      {new Date(data.date)
                        .toLocaleString("default", { weekday: "short" })
                        .toUpperCase()}
                    </h3>
                    <h3 className="font-semibold">
                      {new Date(data.date)
                        .toLocaleString("default", { month: "long" })
                        .toUpperCase()}
                    </h3>
                    <h3 className="font-semibold mr-2">
                      {new Date(data.date).getFullYear()}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <h3 className="font-bold text-green-600">
                      {data.type === "Income" ? data.amount : 0}
                    </h3>
                    <h3 className="font-bold text-red-600">
                      {data.type === "Expense" ? data.amount : 0}
                    </h3>
                  </div>
                </div>

                <div className="py-2">
                  <div className="flex items-center gap-4 px-8 py-1">
                    <span className="min-w-fit bg-green-300 px-4 text-center rounded-lg">
                      {data.category}
                    </span>
                    <span className="font-bold">{data.title}</span>
                    <h3
                      className="flex justify-center gap-8 font-bold"
                      style={{ marginLeft: "auto" }}
                    >
                      {data.amount}
                    </h3>
                    <span onClick={() => handleDeleteTransaction(data._id)}>
                      {" "}
                      <DeleteIcon />{" "}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <h3 className=" mt-8 text-center font-bold text-4xl">
                No Data Found
              </h3>
            </>
          )}
        </>
      ) : null}

      {/* popup window on clicking + button */}
      <PopupModal />
    </main>
  );
};

export default Home;
