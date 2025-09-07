import Header from "@/components/custom/Header";
import React, { useEffect } from "react";
import heroSnapshot from "@/assets/heroSnapshot.png";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaCircle, FaInfoCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { startUser } from "../../Services/login.js";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "@/features/user/userFeatures.js";

function HomePage() {
  const user = useSelector((state) => state.editUser.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    window.open(
      "https://github.com/TraeAI",
      "_blank"
    );
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
    if (user) {
      console.log("Printing from Homepage User is There ");
      navigate("/dashboard");
    } else {
      console.log("Printing for Homepage User Not Found");
      navigate("/auth/sign-in");
    }
  };
  return (
    <>
      <Header user={user} />
      <section className="pt-24 pb-20 bg-gradient-to-b from-background to-purple-100/30">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-foreground md:text-6xl md:tracking-tight">
              <span>Build</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-purple-900 via-primary to-accent lg:inline">
                professional resumes
              </span>{" "}
              <span>with AI power</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-foreground/80 md:text-xl lg:px-24">
              Modern. Personalized. Effective. Elevate your career with our AI-powered resume builder.
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <a
                className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-primary rounded-2xl sm:w-auto sm:mb-0 hover:cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={hadnleGetStartedClick}
              >
                Get Started
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                onClick={handleClick}
                className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-secondary rounded-2xl sm:w-auto sm:mb-0 cursor-pointer hover:bg-secondary/90 transition-colors"
              >
                Learn More
                <FaGithub className="ml-2" />
              </a>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
              <div className="relative overflow-hidden shadow-2xl rounded-xl">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-30"></div>
                <div className="relative">
                  <div className="flex items-center justify-between px-4 bg-gradient-to-r from-purple-800 via-primary to-accent h-11 rounded-t-xl">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-b from-purple-900/5 to-background/95 p-1">
                    <img
                      className="object-cover py-2 px-4 rounded-b-lg transition duration-300 transform hover:scale-105 border border-purple-300/10"
                      src={heroSnapshot}
                      alt="Dashboard"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-gradient-to-b from-purple-800 to-primary/80 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Build Your Professional Resume?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/dashboard"
              className="bg-gradient-to-r from-pink-600 to-accent text-white px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all text-center font-medium border border-pink-300/20 text-lg"
            >
              Start Building Now
            </a>
            <a
              href="#features"
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl shadow-lg hover:bg-white/20 transition-all text-center font-medium border border-white/20 text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      
      <div id="features" className="bg-gradient-to-b from-purple-100/30 via-background to-primary/20 min-h-screen flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
          <h1 className="relative text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-primary to-pink-500 mb-4 text-center">
            Elevate Your Professional Profile
          </h1>
        </div>
        <p className="text-lg text-foreground mb-8 max-w-2xl text-center px-4">
          Our AI-powered resume builder creates tailored, professional resumes that capture attention.
          Enjoy smart content suggestions, modern templates, and instant previews.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="/dashboard"
            className="bg-gradient-to-r from-purple-800 to-primary text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all text-center font-medium border border-purple-300/20"
          >
            Build Your Resume
          </a>
          <a
            href="#features"
            className="bg-gradient-to-r from-teal-500 to-secondary text-white px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all text-center font-medium border border-teal-300/20"
          >
            Explore Features
          </a>
        </div>
        
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-300/10 shadow-xl hover:shadow-purple-500/5 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-primary rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary">AI-Powered Content</h3>
            <p className="text-foreground/80">Our advanced AI suggests professional content tailored to your experience and industry standards.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-300/10 shadow-xl hover:shadow-purple-500/5 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-secondary rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-secondary">Beautiful Templates</h3>
            <p className="text-foreground/80">Choose from a variety of professionally designed templates that stand out to employers.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-300/10 shadow-xl hover:shadow-purple-500/5 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-accent rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-accent">Real-time Preview</h3>
            <p className="text-foreground/80">See changes instantly with our real-time preview feature as you build your perfect resume.</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-900/10 to-primary/10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-primary mb-4">What Our Users Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-300/10 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-primary flex items-center justify-center text-white font-bold">JD</div>
                <div className="ml-4">
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-foreground/70">Software Engineer</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 italic">"This AI Resume Builder transformed my job search. I received more interview calls in one week than I did in months with my old resume!"</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-300/10 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-secondary flex items-center justify-center text-white font-bold">SJ</div>
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-foreground/70">Marketing Director</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 italic">"The AI suggestions were spot-on for my industry. The templates are modern and professional. I landed my dream job within two weeks!"</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-purple-300/10 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-accent flex items-center justify-center text-white font-bold">RM</div>
                <div className="ml-4">
                  <h4 className="font-bold">Robert Miller</h4>
                  <p className="text-sm text-foreground/70">Recent Graduate</p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/80 italic">"As a recent graduate with limited experience, I was struggling to create an impressive resume. This tool helped me highlight my skills and potential. Highly recommended!"</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gradient-to-t from-purple-900/20 to-background py-8 border-t border-primary/10" aria-labelledby="footer-heading">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/70">
              © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
            </p>
          </div>
          <div>
            <Button variant="secondary" onClick={handleClick} className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-secondary text-white hover:opacity-90 transition-all border border-teal-300/20">
              <FaGithub className="w-4 h-4" />
              <span>Visit Our GitHub</span>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
