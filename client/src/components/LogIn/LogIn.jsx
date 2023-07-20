import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth, useRole } from "../../context/authContext";
import axios from "axios";

function LogIn({ updateStudentId, updateStudentHeader }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, role, sendResetPasswordEmail } = UserAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			//fetch and set student ID
			const res = await axios.get(`/api/student/studentInfo/${email}`);
			console.log(res.data);
			console.log(
				"studenid",
				res.data[0].student_id,
				typeof res.data[0].student_id
			);
			if (res.data[0]) {
				updateStudentId(res.data[0]);
        updateStudentHeader(res.data[0]);
			}
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendResetPasswordEmail(email);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (role) {
      if (role === "instructor") {
        console.log("going to instructoroverview");
        navigate("/instructoroverview");
      } else {
        console.log("going to studentoverview");
        navigate("/studentoverview");
      }
    }
  }, [role, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      <main className="flex-grow">
        <section className="flex justify-center items-center h-full place-content-center">
          <div className=" border-zinc-400 p-8 shadow-2xl bg-gray-50 my-64 ">
            <form onSubmit={handleSubmit}>
              <input name="utf8" type="hidden" value="✓" />
              <input type="hidden" />
              <div className="flex justify-center items-center place-content-center">
                <img
                  className="mr-20 ml-20 mt-14 w-60"
                  src="https://dotcom-files.s3.us-west-2.amazonaws.com/galvanize_logo_full-color_light-background.png"
                  alt="logo"
                ></img>
              </div>
              <h2 className="text-center text-3xl mt-5 mb-3 font-light font-serif">
                Sign In
              </h2>
              <div>
                <div className="box-border h-10 w-160 p-4 solid neutral-800 rounded-md border-2 text-left mb-4 w-120 flex items-center bg-pink-50">
                  <input
                    className="bg-pink-50 w-full"
                    placeholder="Email address"
                    id="user_email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="box-border h-10 w-160 p-4 solid neutral-800 rounded-md border-2 text-left w-120 flex items-center bg-pink-50">
                  <input
                    className="bg-pink-50 w-full"
                    placeholder="Password"
                    id="user_password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div>
                  <div className="text-right font-extralight font-sans mr-2 p-1.5 mb-4">
                    <input type="hidden" name="user[remember_me]" value="0" />
                    <label htmlFor="user_remember_me">
                      <input
                        className="mr-2"
                        type="checkbox"
                        name="user[remember_me]"
                        id="user_remember_me"
                        value="1"
                      />
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center justify-self-center">
                <input
                  className="text-sm	rounded-full bg-[#00808C] text-white w-80 py-2 pr-4 pl-4"
                  type="submit"
                  name="commit"
                  data-disable-with="Sign in"
                  value="SIGN IN"
                />
                <div className=" block text-center pt-1 justify-center">
                  <div className="justify-center">
                    <button
                      className="m-0 block text-[#00808C] border-transparent text-base justify-center"
                      onClick={handleResetPassword}
                    >
                      Forgot your password? Type your email into the email
                      address box than click me.
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center py-4">
                      <div className="flex-grow h-px bg-gray-400"></div>
                      <span className="flex-shrink text-xl text-gray-500 px-4 italic font-light">
                        Or
                      </span>
                      <div className="flex-grow h-px bg-gray-400"></div>
                    </div>
                    <div className="justify-self-center text-center">
                      <Link
                        to="/signup"
                        className="m-0 font-semibold text-[#00808C] text-sm border-transparent font-serif"
                      >
                        Click Here
                      </Link>

                      <div className="pt-8 justify-self-center text-sm border-transparent font-serif">
                        <p className="text-[#00808C]">To SignUp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-4">
        <div className="flex justify-center text-xs">
          <span>© 2013 - 2023 Galvanize, Inc.</span>
          <ul className="ml-4 mr-4">
            <li className="inline-block mr-4">
              <a target="_blank" href="http://www.galvanize.com/privacy">
                Privacy Policy
              </a>
            </li>
            <li className="inline-block mr-4">
              <a target="_blank" href="http://www.galvanize.com/terms-of-use">
                Terms of Use
              </a>
            </li>
            <li className="inline-block mr-4">
              <a target="_blank" href="http://www.galvanize.com">
                Galvanize
              </a>
            </li>
            <li className="inline-block mr-4">
              <a href="mailto:info@galvanize.com">info@galvanize.com</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
export default LogIn;
