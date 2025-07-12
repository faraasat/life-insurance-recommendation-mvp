import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center bg-gray-800 text-white py-4">
      <div className="flex items-center justify-between container">
        <div className="text-xl font-bold">LIR MVP</div>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
