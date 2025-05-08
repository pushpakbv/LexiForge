# Recommended Changes and Feature Enhancements

## Core System Improvements

| Category | Recommendation |
|----------|---------------|
| 🔐 **Security** | Implement permission checks: Add creator/owner verification before document deletion and updates |
| 🔧 **Configuration** | Use environment variables: Replace hardcoded values with environment variables |
| 📝 **Documentation** | Add version management: Review all document updates to ensure version is included |
| ⚠️ **User Experience** | Improve error handling: Add user-facing error messages |
| ⚡ **Performance** | Optimize queries: Use backend filters instead of client-side filtering |
| 🛡️ **Data Integrity** | Add input validation: Validate all user inputs before submission |

## Key Feature Capabilities

Our platform will demonstrate excellence through:

- 🤖 **Advanced AI integration** - Intelligent assistance and workflow optimization
- 📊 **Real data analytics and visualization** - Powerful insights for informed decision making
- 🏆 **Sophisticated reputation and incentive system** - Recognizing quality contributions
- 👥 **Peer-to-peer collaboration features** - Seamless teamwork capabilities
- 💎 **Crypto-economic system with real utility** - Tangible value exchange

## Component Implementation Plan

### 1. AI-Powered Quality Enhancement

The AI Assistant component provides intelligent suggestions based on subject context to improve user efficiency.

```jsx
// src/components/AIAssistant.jsx
import { useState } from "react";
import { nanoid } from "nanoid";
import { setDoc } from "@junobuild/core";

export const AIAssistant = ({ subject, onSuggestionSelected }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSuggestions = async () => {
    setIsLoading(true);
    // In a real implementation, you'd call an API here
    // This is a mockup to demonstrate the UI
    setTimeout(() => {
      setSuggestions([
        `How can I change my ${subject.title.includes("password") ? "password" : "account settings"}?`,
        `What's the procedure to update my ${subject.title.includes("password") ? "login credentials" : "profile information"}?`,
        `Could you guide me through ${subject.title.includes("password") ? "resetting my password" : "updating my account"}?`
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full mt-6">
      <button 
        onClick={generateSuggestions}
        className="btn bg-gradient-to-r from-[#F58853] to-[#4C85FB] text-white"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Get AI Suggestions"}
      </button>
      {suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">AI-Generated Suggestions:</h3>
          <div className="flex flex-col gap-2 mt-2">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                className="text-left p-2 border rounded-lg hover:bg-slate-100"
                onClick={() => onSuggestionSelected(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

### 2. Real-Time Marketplace Analytics

This component provides visual insights into marketplace activity with interactive charts.

```jsx
// src/components/marketplace/MarketplaceAnalytics.jsx
import { useState, useEffect } from "react";
import { listDocs } from "@junobuild/core";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from "recharts";

const MarketplaceAnalytics = () => {
  const [data, setData] = useState({
    languages: [],
    payouts: [],
    completionRates: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const { items } = await listDocs({
        collection: "projects",
      });

      // Process language distribution
      const languages = {};
      items.forEach(item => {
        const lang = item.data.language || "Unknown";
        languages[lang] = (languages[lang] || 0) + 1;
      });

      // Process payout data
      const payouts = items.map(item => ({
        name: item.data.title.substring(0, 10) + "...",
        miner: item.data.miner_payout,
        inspector: item.data.inspector_payout
      })).slice(0, 5);

      setData({
        languages: Object.entries(languages).map(([name, value]) => ({ name, value })),
        payouts,
        completionRates: []
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6">Marketplace Insights</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Language Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.languages}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.languages.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Top Project Rewards</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.payouts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="miner" fill="#F5BC73" name="Miner Payout" />
              <Bar dataKey="inspector" fill="#94B5FC" name="Inspector Payout" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAnalytics;
```

### 3. Reputation and Skill Badges System

This system tracks user contributions and awards badges based on performance metrics.

```jsx
// src/components/Dashboard/ReputationSystem.jsx
import { useState, useEffect, useContext } from "react";
import { listDocs } from "@junobuild/core";
import { AuthContext } from "../../Auth";

const ReputationSystem = () => {
  const { user } = useContext(AuthContext);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({
    approvalRate: 0,
    tasksCompleted: 0,
    specializationScore: 0
  });

  useEffect(() => {
    if (user) {
      calculateUserReputation();
    }
  }, [user]);

  const calculateUserReputation = async () => {
    try {
      // Get user's paraphrases
      const { items: paraphrases } = await listDocs({
        collection: "paraphrases",
        filter: {
          data: {
            miner_id: user.key
          }
        }
      });

      // Get user's inspections
      const { items: inspections } = await listDocs({
        collection: "inspections",
        filter: {
          data: {
            inspector_id: user.key
          }
        }
      });

      // Calculate approval rate
      const approvedParaphrases = paraphrases.filter(p => p.data.isApproved === true);
      const approvalRate = paraphrases.length > 0 ? 
        (approvedParaphrases.length / paraphrases.length) * 100 : 0;

      // Calculate tasks completed
      const tasksCompleted = paraphrases.length + inspections.length;

      // Determine badges
      const newBadges = [];
      if (tasksCompleted >= 100) newBadges.push({
        name: "Century Contributor",
        icon: "🏆",
        color: "bg-yellow-100 text-yellow-800"
      });
      if (approvalRate >= 90) newBadges.push({
        name: "Quality Expert",
        icon: "⭐",
        color: "bg-blue-100 text-blue-800"
      });

      // Language specialization 
      const languages = {};
      paraphrases.forEach(p => {
        // Would need to get project language in a real implementation
        const lang = "English"; 
        languages[lang] = (languages[lang] || 0) + 1;
      });
      const topLanguage = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])[0];
      if (topLanguage && topLanguage[1] >= 50) newBadges.push({
        name: `${topLanguage[0]} Specialist`,
        icon: "🌐",
        color: "bg-green-100 text-green-800"
      });

      setBadges(newBadges);
      setStats({
        approvalRate: approvalRate.toFixed(1),
        tasksCompleted,
        specializationScore: Math.min(100, tasksCompleted / 2)
      });
    } catch (error) {
      console.error("Error calculating reputation:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Your Reputation</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Approval Rate</p>
          <p className="text-2xl font-bold">{stats.approvalRate}%</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Tasks Completed</p>
          <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Skill Score</p>
          <p className="text-2xl font-bold">{stats.specializationScore}/100</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-3">Your Badges</h3>
      {badges.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {badges.map((badge, index) => (
            <div key={index} className={`px-3 py-2 rounded-lg ${badge.color} flex items-center gap-2`}>
              <span className="text-xl">{badge.icon}</span>
              <span className="font-medium">{badge.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Complete more tasks to earn reputation badges!</p>
      )}
    </div>
  );
};

export default ReputationSystem;
```

### 4. Peer-to-Peer Direct Collaboration

This hub enables users to invite collaborators and manage collaboration invitations.

```jsx
// src/components/marketplace/CollaborationHub.jsx
import { useState, useEffect, useContext } from "react";
import { listDocs, setDoc } from "@junobuild/core";
import { nanoid } from "nanoid";
import { AuthContext } from "../../Auth";

const CollaborationHub = () => {
  const { user } = useContext(AuthContext);
  const [invitations, setInvitations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProjects();
      fetchUsers();
      fetchInvitations();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { items } = await listDocs({
        collection: "projects",
        filter: {
          data: {
            creator_id: user.key
          }
        }
      });
      setProjects(items);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { items } = await listDocs({
        collection: "users"
      });
      // Filter out current user
      setAvailableUsers(items.filter(item => item.key !== user.key));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchInvitations = async () => {
    try {
      // In a real implementation, you would create a collection for invitations
      // This is just a mockup
      setInvitations([
        {
          id: "inv1",
          projectTitle: "Fintech Chatbot",
          fromUser: "Alex Chen",
          role: "Inspector",
          status: "pending"
        },
        {
          id: "inv2", 
          projectTitle: "Healthcare Assistant",
          fromUser: "Maria Lopez",
          role: "Miner",
          status: "pending"
        }
      ]);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const sendInvitations = async () => {
    try {
      if (!selectedProject) {
        alert("Please select a project");
        return;
      }
      // In a real implementation, you would create invitations in the database
      alert(`Invitations sent to ${selectedUsers.length} users for project ${selectedProject.data.title}`);
      // Reset selection
      setSelectedUsers([]);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error sending invitations:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6">Collaboration Hub</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Invitations</h3>
          {invitations.length > 0 ? (
            <div className="space-y-4">
              {invitations.map(invitation => (
                <div key={invitation.id} className="p-4 border rounded-lg">
                  <p className="font-medium">{invitation.projectTitle}</p>
                  <p className="text-sm text-gray-600">From: {invitation.fromUser}</p>
                  <p className="text-sm text-gray-600">Role: {invitation.role}</p>
                  <div className="mt-3 flex gap-3">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md">Accept</button>
                    <button className="px-3 py-1 bg-gray-200 rounded-md">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending invitations</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Invite Collaborators</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Project</label>
            <select 
              className="w-full p-2 border rounded-md"
              onChange={(e) => {
                const project = projects.find(p => p.key === e.target.value);
                setSelectedProject(project);
              }}
              value={selectedProject?.key || ""}
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.key} value={project.key}>
                  {project.data.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Users</label>
            <div className="max-h-60 overflow-y-auto border rounded-md p-2">
              {availableUsers.map(user => (
                <div key={user.key} className="flex items-center p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.key)}
                    onChange={() => handleUserSelect(user.key)}
                    className="mr-2"
                  />
                  <div className="flex items-center">
                    {user.data.profile_pic && (
                      <img 
                        src={user.data.profile_pic} 
                        alt={user.data.username} 
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <span>{user.data.username || user.key.slice(-8)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={sendInvitations}
            disabled={!selectedProject || selectedUsers.length === 0}
            className="px-4 py-2 bg-inspectorDark text-white rounded-md disabled:opacity-50"
          >
            Send Invitations
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;
```

### 5. Dynamic Skill-Based Gem Exchange Rates

This component facilitates the exchange of earned gems for rewards or currency.

```jsx
// src/components/Dashboard/GemExchange.jsx
import { useState, useEffect } from "react";
import { Line } from "recharts";
import { 
  LineChart, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const GemExchange = () => {
  const [conversionRate, setConversionRate] = useState(0.05); // SGD per gem
  const [gemAmount, setGemAmount] = useState(100);
  const [currencyAmount, setCurrencyAmount] = useState(5);
  const [selectedCurrency, setSelectedCurrency] = useState("SGD");
  const [rateHistory, setRateHistory] = useState([]);
  const [exchangeMode, setExchangeMode] = useState("cash"); // cash or skill
  const [withdrawalAddress, setWithdrawalAddress] = useState("");

  useEffect(() => {
    // Generate mock rate history
    const today = new Date();
    const history = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const baseRate = 0.05;
      const fluctuation = (Math.random() * 0.01) - 0.005;
      const rate = baseRate + fluctuation;
      history.push({
        date: date.toLocaleDateString(),
        rate: rate.toFixed(3),
      });
    }
    setRateHistory(history);
  }, []);

  const handleGemChange = (e) => {
    const gems = parseFloat(e.target.value);
    setGemAmount(gems);
    setCurrencyAmount((gems * conversionRate).toFixed(2));
  };

  const handleCurrencyChange = (e) => {
    const currency = parseFloat(e.target.value);
    setCurrencyAmount(currency);
    setGemAmount((currency / conversionRate).toFixed(0));
  };

  const handleCurrencySelect = (e) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    // Adjust conversion rate based on currency
    let newRate = 0.05; // base SGD
    if (currency === "USD") newRate = 0.037;
    else if (currency === "EUR") newRate = 0.034;
    else if (currency === "ICP") newRate = 0.005;
    setConversionRate(newRate);
    setCurrencyAmount((gemAmount * newRate).toFixed(2));
  };

  const exchangeOptions = [
    { id: "cash", name: "Cash Withdrawal", description: "Withdraw gems as fiat currency" },
    { id: "skill", name: "Skill Exchange", description: "Trade gems for skill badges and benefits" }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Gem Exchange</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex space-x-2 mb-6">
            {exchangeOptions.map(option => (
              <button
                key={option.id}
                className={`px-4 py-2 rounded-md ${
                  exchangeMode === option.id 
                    ? 'bg-creatorDark text-white' 
                    : 'bg-gray-100'
                }`}
                onClick={() => setExchangeMode(option.id)}
              >
                {option.name}
              </button>
            ))}
          </div>
          {exchangeMode === 'cash' ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gems to Exchange</label>
                <div className="relative">
                  <input
                    type="number"
                    value={gemAmount}
                    onChange={handleGemChange}
                    className="w-full p-2 border rounded-md pr-12"
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    💎
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">You'll Receive</label>
                <div className="flex">
                  <input
                    type="number"
                    value={currencyAmount}
                    onChange={handleCurrencyChange}
                    className="w-full p-2 border rounded-l-md"
                    min="0"
                  />
                  <select
                    className="p-2 border border-l-0 rounded-r-md"
                    value={selectedCurrency}
                    onChange={handleCurrencySelect}
                  >
                    <option value="SGD">SGD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="ICP">ICP</option>
                  </select>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Current rate: 1 💎 = {conversionRate} {selectedCurrency}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Withdrawal Address</label>
                <input
                  type="text"
                  value={withdrawalAddress}
                  onChange={(e) => setWithdrawalAddress(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder={selectedCurrency === "ICP" ? "Principal ID or Account ID" : "Bank Account or Wallet Address"}
                />
              </div>
              <button 
                className="w-full px-4 py-2 bg-creatorDark text-white rounded-md"
                onClick={() => alert(`Withdrawal request submitted for ${gemAmount} gems (${currencyAmount} ${selectedCurrency})`)}
              >
                Submit Withdrawal Request
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-3">Skill Enhancement</h3>
              <p className="mb-4 text-sm text-gray-600">
                Exchange your gems for special skill badges and benefits
              </p>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Featured Validator Status</p>
                    <p className="text-sm text-gray-600">Higher visibility and more inspection tasks</p>
                  </div>
                  <button className="px-3 py-1 bg-creatorDark text-white rounded-md">
                    500 💎
                  </button>
                </div>
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">AI Assistant Pro</p>
                    <p className="text-sm text-gray-600">Enhanced AI suggestions for 30 days</p>
                  </div>
                  <button className="px-3 py-1 bg-creatorDark text-white rounded-md">
                    300 💎
                  </button>
                </div>
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium">Exclusive Creator Badge</p>
                    <p className="text-sm text-gray-600">Recognition and priority project approvals</p>
                  </div>
                  <button className="px-3 py-1 bg-creatorDark text-white rounded-md">
                    1000 💎
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Exchange Rate History</h3>
          <p className="text-sm text-gray-600 mb-4">Gem value over the past 30 days</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rateHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                interval={5}
              />
              <YAxis 
                domain={[0.04, 0.06]} 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.toFixed(3)}
              />
              <Tooltip formatter={(value) => [`${value} ${selectedCurrency}`, "Exchange Rate"]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#00C8A0" 
                name="Gem Value" 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GemExchange;
```
