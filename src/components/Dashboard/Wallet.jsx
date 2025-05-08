import { useContext, useEffect, useState } from "react";
import { listDocs, setDoc } from "@junobuild/core";
import { AuthContext } from "../../Auth";
import { NavLink } from "react-router-dom";

const Wallet = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    profile_pic: "",
    total_gems: 0,
    current_gems: 0,
    transactions: [],
  });
  
  const [weeklyChange, setWeeklyChange] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const userData = await listDocs({
        collection: "users",
      });

      const filteredData = userData.items.find((data) => data.key === user.key);

      if (filteredData && filteredData.data) {
        console.log("User wallet data found:", filteredData.data);
        setUserInfo(filteredData.data);
        
        // Calculate weekly change
        calculateWeeklyChange(filteredData.data.transactions || []);
      }
    } catch (error) {
      console.error("Error fetching user wallet data:", error);
    }
  };

  const calculateWeeklyChange = (transactions) => {
    if (!transactions || transactions.length === 0) return;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate >= oneWeekAgo;
    });

    const change = weeklyTransactions.reduce((acc, tx) => {
      return acc + tx.amount;
    }, 0);
    
    setWeeklyChange(change);
  };

  return (
    <div className="text-[#d4d4d4]">
      {/* Balance Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[#a0a0a0] text-sm mb-1">Total Balance</p>
          <h3 className="text-2xl font-bold">{userInfo.current_gems?.toLocaleString() || 0} 💎</h3>
        </div>
        <div className="px-4 py-2 bg-[#333333] rounded-lg border border-[#404040]">
          <span className={`font-medium ${weeklyChange >= 0 ? 'text-[#F58853]' : 'text-red-400'}`}>
            {weeklyChange >= 0 ? '+' : ''}{weeklyChange} 💎
          </span>
          <p className="text-xs text-[#a0a0a0]">This week</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <NavLink
          to="/account?tab=gems"
          className="flex-1 px-4 py-3 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] hover:text-white transition-all duration-200 text-center"
        >
          Buy Gems ⬇️
        </NavLink>
        <NavLink
          to="/account?tab=gems"
          className="flex-1 px-4 py-3 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] hover:text-white transition-all duration-200 text-center"
        >
          Withdraw ⬆️
        </NavLink>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-[#d4d4d4] font-medium mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {userInfo.transactions && userInfo.transactions.length > 0 ? (
            userInfo.transactions.slice(0, 3).map((transaction, index) => (
              <div 
                key={index}
                className="p-3 bg-[#333333] rounded-lg border border-[#404040] flex items-center justify-between group hover:border-[#F58853] transition-colors"
              >
                <div>
                  <p className="font-medium text-[#d4d4d4]">{transaction.type}</p>
                  <p className="text-sm text-[#a0a0a0]">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.amount >= 0 ? 'text-[#F58853]' : 'text-red-400'}`}>
                    {transaction.amount >= 0 ? '+' : ''}{transaction.amount} 💎
                  </p>
                  <p className={`text-xs ${transaction.status === 'Completed' ? 'text-[#4C85FB]' : 'text-[#a0a0a0]'}`}>
                    {transaction.status} {transaction.status === 'Completed' ? '✅' : ''}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 bg-[#333333] rounded-lg border border-[#404040] text-center">
              <p className="text-[#a0a0a0]">No recent transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
