import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#F3F3F3] w-full">
    <footer className="footer p-10 items-center lg:justify-between text-base-content max-w-[85rem] mx-auto">
    <div className="w-full h-full flex items-center justify-center">
      <nav>
      <Link to="/">
      <img src="https://i.ibb.co/S09VYwN/elevro-logo.png" className="w-1/2 lg:w-7/12" alt="" />
        </Link>
      </nav>
      </div>
      <nav>
        <header className="footer-title">Services</header>
        <Link to="/all-tests" className="link link-hover">All Test</Link>
        <Link to="/featured-tests" className="link link-hover">Featured Test</Link>
        <Link to="/contact-us" className="link link-hover">Contact Us</Link>
      </nav>
      <nav>
        <header className="footer-title">Resources</header>
        <Link to="/blog" className="link link-hover">Blog</Link>
        <Link to="/login" className="link link-hover">Login</Link>
        <Link to="/register" className="link link-hover">Register</Link>
      </nav>
      
      <form>
        <header className="footer-title">Newsletter</header>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item"
            />
            <button className="btn bg-primary text-white join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
    </div>
  );
};

export default Footer;
