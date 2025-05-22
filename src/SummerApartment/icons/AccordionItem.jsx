import OpenCloseIcon from "./openClose";
const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b py-3">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-right"
      >
        <span className="font-medium">{title}</span>
        <div className="w-6 h-6 flex items-center justify-center rounded-full border">
        <OpenCloseIcon rotated={isOpen} />
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 text-sm text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
