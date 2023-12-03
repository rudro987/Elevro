import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { useRef } from 'react';

const ContactUS = () => {
  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_g4cv94o', 'template_r28tpj8', form.current, '6c-zeKucJZvs--fdU')
    .then(response => 
       console.log('SUCCESS!', response.status, response.text)
    , (error) =>  
       console.log('FAILED...', error)
    )
  }
  return (
    <div className="w-full">
      <Helmet>
        <title>Elevro | Contact Us</title>
      </Helmet>
      <div className="w-full">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="lg:w-1/2">
            <div className="flex justify-center items-center h-[750px]">
              <img
                src="https://i.ibb.co/XXhPw9V/side-picture.png"
              />
            </div>
          </div>
          <div className="lg:w-1/2 py-36 bg-primary">
            <div className="card max-w-lg mx-auto text-titleText">
              <h1 className="text-3xl font-bold text-center pt-14 text-menuText">
                Send Us a Message
              </h1>
              <form onSubmit={handleSubmit} ref={form} className="card-body">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="input input-bordered rounded-md h-[55px] focus:outline-none bg-[#E6E6E6] border-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="input input-bordered rounded-md h-[55px] focus:outline-none bg-[#E6E6E6] border-none"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-menuText">Message</span>
                  </label>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    className="input input-bordered rounded-md h-[155px] focus:outline-none bg-[#E6E6E6] border-none pt-4"
                    
                    required>
                    </textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn border-none rounded-md h-[55px] bg-secondary hover:bg-secondaryHover text-white font-bold">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
