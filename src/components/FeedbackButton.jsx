const FeedbackButton = ({ id }) => {
  return (
    <div>
      <button
        className="btn fixed bottom-16 left-20 bg-white shadow-lg"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Feedback?
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box flex flex-col items-center justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="mb-2 text-sm font-medium">
            Please let us know below if you have any feedback
          </h3>
          <textarea rows="5" cols="30" className="border-[1px] p-2"></textarea>
          <p className="mt-1 text-[10px] text-slate-600">
            {id ? `Subject ID: ${id}` : ""}
          </p>
          <button
            className="btn mt-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            Submit
          </button>
        </div>
      </dialog>
    </div>
  );
};
export default FeedbackButton;
