function Header({ link1, link2, link3 }) {
  return (
    <header className="bg-white p-4 rounded shadow mb-6 flex justify-center items-center flex-wrap">
      <nav className="flex gap-4 mt-2 sm:mt-0 justify-center content-center">
        <a href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition">{link1}</a>
        <a href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition">{link2}</a>
        <a href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600 transition">{link3}</a>
      </nav>
    </header>
  );
}

export default Header;