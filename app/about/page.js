// import React from 'react';

// const About = () => {
//     return (
//         <div className="container mx-auto px-8 md:px-4 py-8">
//             <h1 className="text-3xl font-semibold mb-4">About - BrewMe</h1>
//             <p className="text-lg mb-6">
//                 Brew me a cup of coffee is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It&apos;s a space where your fans can directly contribute to your creative endeavors by buying you a chai. Unlock the potential of your fanbase and bring your projects to life.
//             </p>

//             <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                 <div className="flex items-center mb-6">
//                     <img className="w-20 h-20 rounded-full mr-4" src="/com.gif" alt="Fans Want to Collaborate" />
//                     <div>
//                         <h3 className="text-xl font-semibold mb-2">Fans Want to Collaborate</h3>
//                         <p>Your fans are enthusiastic about collaborating with you on your projects.</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center mb-6">
//                     <img className="w-20 h-20 rounded-full mr-4" src="/star.gif" alt="Support Through Chai" />
//                     <div>
//                         <h3 className="text-xl font-semibold mb-2">Support Through Coffee</h3>
//                         <p>Receive support from your fans in the form of coffee purchases, directly contributing to your project funding.</p>
//                     </div>
//                 </div>
//                 {/* Add more steps as needed */}
//             </div>

//             <h2 className="text-2xl font-semibold mb-4">Benefits for Creators</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Direct financial support from your fanbase</li>
//                 <li className="mb-2">Engage with your fans on a more personal level</li>
//                 <li className="mb-2">Access to a platform tailored for creative projects</li>
//                 {/* Add more benefits */}
//             </ul>

//             <h2 className="text-2xl font-semibold mb-4">Benefits for Fans</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Directly contribute to the success of your favorite creators</li>
//                 <li className="mb-2">Exclusive rewards and perks for supporting creators</li>
//                 <li className="mb-2">Be part of the creative process and connect with creators</li>
//                 {/* Add more benefits */}
//             </ul>

//             {/* Additional sections */}
//             <h2 className="text-2xl font-semibold mb-4">Benefits of Collaboration</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Unlock new opportunities through collaboration with fellow creators</li>
//                 <li className="mb-2">Expand your network and reach a wider audience</li>
//                 <li className="mb-2">Combine skills and resources to create innovative projects</li>
//                 {/* Add more benefits */}
//             </ul>

//             <h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Interact with a supportive community of like-minded individuals</li>
//                 <li className="mb-2">Receive valuable feedback and encouragement from peers</li>
//                 <li className="mb-2">Participate in discussions and events centered around your interests</li>
//                 {/* Add more benefits */}
//             </ul>

//             <h2 className="text-2xl font-semibold mb-4">Access to Resources</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Gain access to resources such as tutorials, templates, and tools</li>
//                 <li className="mb-2">Receive guidance and mentorship from experienced creators</li>
//                 <li className="mb-2">Stay updated on industry trends and best practices</li>
//                 {/* Add more benefits */}
//             </ul>

//             <h2 className="text-2xl font-semibold mb-4">Recognition and Exposure</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Showcase your work to a global audience and gain recognition</li>
//                 <li className="mb-2">Feature in promotional materials and campaigns</li>
//                 <li className="mb-2">Build your portfolio and increase your credibility as a creator</li>
//                 {/* Add more benefits */}
//             </ul>

//             <h2 className="text-2xl font-semibold mb-4">Supportive Community</h2>
//             <ul className="list-disc pl-6 mb-6">
//                 <li className="mb-2">Join a community that values creativity, diversity, and inclusivity</li>
//                 <li className="mb-2">Find encouragement and inspiration from fellow members</li>
//                 <li className="mb-2">Collaborate on projects and share resources for mutual growth</li>
//                 {/* Add more benefits */}
//             </ul>

//         </div>
//     );
// }

// export default About;

// export const metadata = {
//     title: "About - Brewme",
//   }
   


import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h1 className="text-4xl font-bold text-amber-950 mb-4">
            About - BrewMe
          </h1>

          <p className="text-lg text-gray-700 leading-8">
            Brew me a cup of coffee is a crowdfunding platform designed for
            creators to fund their projects with the support of their fans.
            It&apos;s a space where your fans can directly contribute to your
            creative endeavors by buying you a chai. Unlock the potential of
            your fanbase and bring your projects to life.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-8">
            How It Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="flex items-center gap-5 bg-pink-50 rounded-xl p-5">
              <img
                className="w-20 h-20 rounded-full"
                src="/com.gif"
                alt="Fans Want to Collaborate"
              />

              <div>
                <h3 className="text-xl font-semibold text-amber-950 mb-2">
                  Fans Want to Collaborate
                </h3>

                <p className="text-gray-700">
                  Your fans are enthusiastic about collaborating with you on
                  your projects.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-pink-50 rounded-xl p-5">
              <img
                className="w-20 h-20 rounded-full"
                src="/star.gif"
                alt="Support Through Coffee"
              />

              <div>
                <h3 className="text-xl font-semibold text-amber-950 mb-2">
                  Support Through Coffee
                </h3>

                <p className="text-gray-700">
                  Receive support from your fans in the form of coffee
                  purchases, directly contributing to your project funding.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Benefits for Creators */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Benefits for Creators
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>Direct financial support from your fanbase</li>
            <li>Engage with your fans on a more personal level</li>
            <li>Access to a platform tailored for creative projects</li>
          </ul>
        </div>

        {/* Benefits for Fans */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Benefits for Fans
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>
              Directly contribute to the success of your favorite creators
            </li>
            <li>Exclusive rewards and perks for supporting creators</li>
            <li>
              Be part of the creative process and connect with creators
            </li>
          </ul>
        </div>

        {/* Benefits of Collaboration */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Benefits of Collaboration
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>
              Unlock new opportunities through collaboration with fellow
              creators
            </li>
            <li>Expand your network and reach a wider audience</li>
            <li>
              Combine skills and resources to create innovative projects
            </li>
          </ul>
        </div>

        {/* Community Engagement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Community Engagement
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>
              Interact with a supportive community of like-minded individuals
            </li>
            <li>
              Receive valuable feedback and encouragement from peers
            </li>
            <li>
              Participate in discussions and events centered around your
              interests
            </li>
          </ul>
        </div>

        {/* Access to Resources */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Access to Resources
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>
              Gain access to resources such as tutorials, templates, and
              tools
            </li>
            <li>
              Receive guidance and mentorship from experienced creators
            </li>
            <li>
              Stay updated on industry trends and best practices
            </li>
          </ul>
        </div>

        {/* Recognition and Exposure */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Recognition and Exposure
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>
              Showcase your work to a global audience and gain recognition
            </li>
            <li>Feature in promotional materials and campaigns</li>
            <li>
              Build your portfolio and increase your credibility as a creator
            </li>
          </ul>
        </div>

        {/* Supportive Community */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-pink-100">
          <h2 className="text-3xl font-bold text-amber-950 mb-6">
            Supportive Community
          </h2>

          <ul className="space-y-4 list-disc pl-6 text-gray-700">
            <li>
              Join a community that values creativity, diversity, and
              inclusivity
            </li>
            <li>
              Find encouragement and inspiration from fellow members
            </li>
            <li>
              Collaborate on projects and share resources for mutual growth
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - Brewme",
};