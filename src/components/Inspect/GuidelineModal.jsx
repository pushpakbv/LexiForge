const GuidelineModal = () => {
  return (
    <dialog id="guideline_modal" className="modal">
      <div className="modal-box max-w-4xl bg-[#2d2d2d] p-6 rounded-xl border border-[#404040]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#d4d4d4]">Additional Examples</h3>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost text-[#d4d4d4] hover:bg-[#404040]">✕</button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040]">
                <th className="py-3 px-4 text-left text-[#F58853] font-medium">Original Subject</th>
                <th className="py-3 px-4 text-left text-[#F58853] font-medium">Paraphrases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#404040]">
              {/* Example 1 */}
              <tr>
                <td className="py-4 px-4 align-top text-[#d4d4d4]">
                  I want to order bak chor mee.
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <div>
                        <p className="text-[#d4d4d4]">Can I have a plate of bak chor mee?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">I want to eat chicken rice.</p>
                        <p className="text-[#a0a0a0] text-sm">(not relevant)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">I am consumed by the great desire to devour some bak chor mee now.</p>
                        <p className="text-[#a0a0a0] text-sm">(not natural)</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Example 2 */}
              <tr>
                <td className="py-4 px-4 align-top text-[#d4d4d4]">
                  I want to find more information about the sequin encrusted cocktail dress.
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <div>
                        <p className="text-[#d4d4d4]">May I have more details about the sequined dress?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">I want more information about this dress.</p>
                        <p className="text-[#a0a0a0] text-sm">(not accurate enough)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">Give me more info about the sequin encrusted pants.</p>
                        <p className="text-[#a0a0a0] text-sm">(original meaning is lost)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">I need details regarding the clothes with shiny things.</p>
                        <p className="text-[#a0a0a0] text-sm">(keywords not present)</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Example 3 */}
              <tr>
                <td className="py-4 px-4 align-top text-[#d4d4d4]">
                  Do you have the new running sneakers in size 9?
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <div>
                        <p className="text-[#d4d4d4]">Can I find the latest running shoes in size 9?</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <div>
                        <p className="text-[#d4d4d4]">I'm looking for the latest size 9 running sneakers.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">Are there new running shoes in other sizes?</p>
                        <p className="text-[#a0a0a0] text-sm">(not accurate enough)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      <div>
                        <p className="text-[#d4d4d4]">I want to know if you have the new running shorts.</p>
                        <p className="text-[#a0a0a0] text-sm">(original meaning is lost)</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="px-6 py-2 bg-gradient-to-r from-[#F58853] to-[#4C85FB] text-white rounded-lg hover:opacity-90 transition-opacity">
              Close
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default GuidelineModal;
