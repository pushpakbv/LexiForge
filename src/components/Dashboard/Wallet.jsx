const Wallet = () => {
  return (
    <div className="text-[#d4d4d4]">
      {/* Balance Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[#a0a0a0] text-sm mb-1">Total Balance</p>
          <h3 className="text-2xl font-bold">42,039 💎</h3>
        </div>
        <div className="px-4 py-2 bg-[#333333] rounded-lg border border-[#404040]">
          <span className="text-[#F58853] font-medium">+302 💎</span>
          <p className="text-xs text-[#a0a0a0]">This week</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 px-4 py-3 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] hover:text-white transition-all duration-200">
          Buy Gems ⬇️
        </button>
        <button className="flex-1 px-4 py-3 bg-[#333333] text-[#d4d4d4] rounded-lg border border-[#404040] hover:bg-[#3c3c3c] hover:text-white transition-all duration-200">
          Withdraw ⬆️
        </button>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-[#d4d4d4] font-medium mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="p-3 bg-[#333333] rounded-lg border border-[#404040] flex items-center justify-between group hover:border-[#F58853] transition-colors">
            <div>
              <p className="font-medium text-[#d4d4d4]">Cafe Chatbot</p>
              <p className="text-sm text-[#a0a0a0]">Can I add almond milk to my latte?</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#F58853]">20 💎</p>
              <p className="text-xs text-[#4C85FB]">Approved ✅</p>
            </div>
          </div>

          <div className="p-3 bg-[#333333] rounded-lg border border-[#404040] flex items-center justify-between group hover:border-[#F58853] transition-colors">
            <div>
              <p className="font-medium text-[#d4d4d4]">Fashion E-commerce FAQ</p>
              <p className="text-sm text-[#a0a0a0]">Can I get a discount on this item?</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#F58853]">10 💎</p>
              <p className="text-xs text-[#a0a0a0]">Pending</p>
            </div>
          </div>

          <div className="p-3 bg-[#333333] rounded-lg border border-[#404040] flex items-center justify-between group hover:border-[#F58853] transition-colors">
            <div>
              <p className="font-medium text-[#d4d4d4]">AI/ML Research</p>
              <p className="text-sm text-[#a0a0a0]">What does AI stand for?</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#F58853]">2 💎</p>
              <p className="text-xs text-[#a0a0a0]">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
