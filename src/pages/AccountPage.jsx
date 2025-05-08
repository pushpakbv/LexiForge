//-----------Libraries-----------//
import { useContext, useState, useEffect } from "react";
import { listDocs, setDoc } from "@junobuild/core";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

//-----------Components-----------//
import NavBar from "../components/NavBar";

//-----------Providers-----------//
import { AuthContext } from "../Auth";
import gemIcon from "../Media/gem.png";

const AccountPage = () => {
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // User data state
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    profile_pic: "",
    isValidator: false,
    job_count: 0,
    total_gems: 0,
    current_gems: 0,
    transactions: [],
  });

  // File upload state
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  // Tabs for different sections
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
  
  // Gem transaction state
  const [buyAmount, setBuyAmount] = useState(100);
  const [sellAmount, setSellAmount] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [user]);
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const userData = await listDocs({
        collection: "users",
      });

      const filteredData = userData.items.find((data) => data.key === user.key);

      if (filteredData) {
        console.log("User data found:", filteredData);
        setUserInfo(filteredData.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
    // Note: Actual image upload would happen here
    // This is just a placeholder for UI demo purposes
    setUserInfo({
      ...userInfo,
      profile_pic: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }));
  };

  const saveUserData = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setSaveMessage("");

    try {
      await setDoc({
        collection: "users",
        doc: {
          key: user.key,
          data: userInfo,
        },
      });
      setSaveMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveMessage("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Gem management functions
  const handleBuyGems = async () => {
    if (!user || isProcessing || buyAmount <= 0) return;
    
    setIsProcessing(true);
    setSaveMessage("");

    try {
      // Create a transaction record
      const transaction = {
        type: "Purchase",
        amount: buyAmount,
        date: new Date().toISOString(),
        status: "Completed",
        cost: (buyAmount * 0.1).toFixed(2) + " USD"
      };

      const updatedUserInfo = {
        ...userInfo,
        current_gems: (userInfo.current_gems || 0) + buyAmount,
        total_gems: (userInfo.total_gems || 0) + buyAmount,
        transactions: [transaction, ...(userInfo.transactions || [])]
      };
      
      // Update in database
      await setDoc({
        collection: "users",
        doc: {
          key: user.key,
          data: updatedUserInfo,
        },
      });
      
      setUserInfo(updatedUserInfo);
      setSaveMessage(`Successfully purchased ${buyAmount} gems!`);
    } catch (error) {
      console.error("Error buying gems:", error);
      setSaveMessage("Failed to purchase gems. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSellGems = async () => {
    if (!user || isProcessing || sellAmount <= 0) return;
    
    setIsProcessing(true);
    setSaveMessage("");
    
    if ((userInfo.current_gems || 0) < sellAmount) {
      setSaveMessage("Not enough gems to sell!");
      setIsProcessing(false);
      return;
    }
    
    try {
      // Create a transaction record
      const transaction = {
        type: "Sale",
        amount: -sellAmount, // Negative to indicate gems leaving the account
        date: new Date().toISOString(),
        status: "Completed",
        received: (sellAmount * 0.08).toFixed(2) + " USD"
      };

      const updatedUserInfo = {
        ...userInfo,
        current_gems: (userInfo.current_gems || 0) - sellAmount,
        transactions: [transaction, ...(userInfo.transactions || [])]
      };
      
      // Update in database
      await setDoc({
        collection: "users",
        doc: {
          key: user.key,
          data: updatedUserInfo,
        },
      });
      
      setUserInfo(updatedUserInfo);
      setSaveMessage(`Successfully sold ${sellAmount} gems!`);
    } catch (error) {
      console.error("Error selling gems:", error);
      setSaveMessage("Failed to sell gems. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-[#1e1e1e]">
        <NavBar />
        <div className="mt-32 text-center text-[#d4d4d4]">
          <h2 className="text-2xl">Please log in to view your account</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#1e1e1e] text-[#d4d4d4]">
      <NavBar />

      <motion.main
        className="mt-24 w-full max-w-4xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Account</h1>
          <div className="h-1 w-24 mt-2 bg-gradient-to-r from-[#4C85FB] to-[#F58853] rounded-full" />
        </div>

        {/* Account Summary Card */}
        <div className="w-full p-6 bg-[#2d2d2d] rounded-xl border border-[#404040] mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userInfo.profile_pic || gemIcon}
              alt="Profile"
              className="w-16 h-16 rounded-full bg-[#252526] object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{userInfo.username || user.key.slice(-8)}</h2>
              <p className="text-[#a0a0a0]">{userInfo.email || "No email provided"}</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-[#333333] rounded-lg border border-[#404040] text-center">
            <p className="text-xl font-bold text-[#F58853]">{userInfo.current_gems} 💎</p>
            <p className="text-sm text-[#a0a0a0]">Available Gems</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-[#404040] mb-6">
          <button
            className={`px-6 py-3 ${
              activeTab === "profile"
                ? "border-b-2 border-[#4C85FB] text-[#4C85FB] font-medium"
                : "text-[#a0a0a0] hover:text-[#d4d4d4]"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile Settings
          </button>
          <button
            className={`px-6 py-3 ${
              activeTab === "gems"
                ? "border-b-2 border-[#F58853] text-[#F58853] font-medium"
                : "text-[#a0a0a0] hover:text-[#d4d4d4]"
            }`}
            onClick={() => setActiveTab("gems")}
          >
            Gem Management
          </button>
        </div>

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <div className="bg-[#2d2d2d] rounded-xl border border-[#404040] p-6">
            <h3 className="text-xl font-medium mb-6">Edit Your Profile</h3>
            
            <div className="mb-6 flex flex-col items-center">
              <img
                src={userInfo.profile_pic || gemIcon}
                alt="Profile"
                className="w-24 h-24 rounded-full bg-[#252526] object-cover mb-4"
              />
              <label className="px-4 py-2 bg-[#333333] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] cursor-pointer">
                Change Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#a0a0a0] mb-2">Username</label>
                <input
                  id="username"
                  type="text"
                  value={userInfo.username || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#333333] border border-[#404040] rounded-lg focus:outline-none focus:border-[#4C85FB]"
                  placeholder="Username"
                />
              </div>
              
              <div>
                <label className="block text-[#a0a0a0] mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={userInfo.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#333333] border border-[#404040] rounded-lg focus:outline-none focus:border-[#4C85FB]"
                  placeholder="Email address"
                />
              </div>
              
              <div className="pt-4">
                <button
                  onClick={saveUserData}
                  disabled={isSaving}
                  className="px-6 py-2 bg-gradient-to-r from-[#4C85FB] to-[#4169E1] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                
                {saveMessage && (
                  <p className={`mt-2 text-sm ${saveMessage.includes("Failed") ? "text-red-400" : "text-green-400"}`}>
                    {saveMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gems Tab Content */}
        {activeTab === "gems" && (
          <div className="bg-[#2d2d2d] rounded-xl border border-[#404040] p-6">
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-2">Your Gem Balance</h3>
              <div className="flex items-center gap-2 text-3xl font-bold text-[#F58853]">
                {userInfo.current_gems} <span className="text-2xl">💎</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buy Gems Section */}
              <div className="bg-[#333333] rounded-lg border border-[#404040] p-6">
                <h4 className="text-lg font-medium mb-4">Buy Gems</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#a0a0a0] mb-2">Amount</label>
                    <input
                      type="number"
                      min="10"
                      step="10"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-[#252526] border border-[#404040] rounded-lg focus:outline-none focus:border-[#4C85FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#a0a0a0] mb-2">Cost</label>
                    <div className="w-full px-4 py-3 bg-[#252526] border border-[#404040] rounded-lg">
                      ${(buyAmount * 0.1).toFixed(2)} USD
                    </div>
                  </div>
                  <button
                    onClick={handleBuyGems}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#4C85FB] to-[#4169E1] text-white rounded-lg font-medium hover:opacity-90"
                  >
                    Buy Gems
                  </button>
                </div>
              </div>
              
              {/* Sell Gems Section */}
              <div className="bg-[#333333] rounded-lg border border-[#404040] p-6">
                <h4 className="text-lg font-medium mb-4">Sell Gems</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#a0a0a0] mb-2">Amount</label>
                    <input
                      type="number"
                      min="10"
                      max={userInfo.current_gems}
                      step="10"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-[#252526] border border-[#404040] rounded-lg focus:outline-none focus:border-[#4C85FB]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#a0a0a0] mb-2">You Receive</label>
                    <div className="w-full px-4 py-3 bg-[#252526] border border-[#404040] rounded-lg">
                      ${(sellAmount * 0.08).toFixed(2)} USD
                    </div>
                  </div>
                  <button
                    onClick={handleSellGems}
                    disabled={sellAmount > userInfo.current_gems}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#F58853] to-[#ff7641] text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
                  >
                    Sell Gems
                  </button>
                </div>
              </div>
            </div>
            
            {saveMessage && (
              <p className={`mt-4 text-center ${saveMessage.includes("Not enough") ? "text-red-400" : "text-green-400"}`}>
                {saveMessage}
              </p>
            )}
            
            {/* Transaction History */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Transaction History</h4>
              <div className="bg-[#333333] rounded-lg border border-[#404040] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#404040]">
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInfo.transactions.map((transaction, index) => (
                      <tr key={index} className="border-b border-[#404040]">
                        <td className="py-3 px-4">{transaction.date}</td>
                        <td className="py-3 px-4">{transaction.type}</td>
                        <td className="py-3 px-4">{transaction.amount > 0 ? `+${transaction.amount} 💎` : `${transaction.amount} 💎`}</td>
                        <td className="py-3 px-4"><span className="px-2 py-1 bg-green-900 text-green-300 rounded-md text-xs">{transaction.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default AccountPage;