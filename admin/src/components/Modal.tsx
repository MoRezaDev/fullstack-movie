type modalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};
export default function Modal({ children, onClose }: modalProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0  flex items-center justify-center transition duration-300 ease-in-out  bg-black/40 
        `}
    >
      {children}
    </div>
  );
}
