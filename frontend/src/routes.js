import Home from "./components/home/Home.jsx";


export const route = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    id: 2,
    name: "About Us",
    path: "/about-us",
    component: <About />,
  },
  {
    id: 3,
    name: "Contact Us",
    path: "/contact-us",
    component: <Contact />,
  },
  {
    id: 4,
    name: "Register Your School",
    path: "/register-your-school",
    component: <RegisterSchool />,
  },
  {
    id: 5,
    name: "Schools Near Me ",
    path: "/schools-near-me",
    component: <School />,
  },
  {
    id: 6,
    name: "News & Blogs ",
    path: "/news-and-blogs",
    component: <Blogs />,
  },
  {
    id: 7,
    name: "Terms & Conditions ",
    path: "/terms-and-conditions",
    component: <TermsCondition />,
  },
  {
    id: 8,
    name: "Privacy Policy",
    path: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    id: 9,
    name: "Frequently Asked Questions",
    path: "/frequently-asked-questions",
    component: <FAQ />,
  },
  {
    id: 10,
    name: "Single School",
    path: "/schools/:slug",
    component: <SingleSchool />,
  },
  {
    id: 11,
    name: "Admission Enquiry",
    path: "admission-enquiry",
    component: <AdmissionEnquiry />,
  },
  {
    id: 12,
    name: "Claim Your School",
    path: "claim-your-school",
    component: <ClaimSchool />,
  },
  {
    id: 13,
    name: "School Compare",
    path: "school/compare",
    component: <SchoolCompares />,
  },
  {
    id: 14,
    name: "Refund Policy",
    path: "refund-policy",
    component: <RefundPolicy />,
  },
  {
    id: 15,
    name: "Careers",
    path: "careers",
    component: <Careers />,
  },
  {
    id: 16,
    name: "Single Blog",
    path: "/blogs/:slug",
    component: <SingleBlog />,
  },
  {
    id: 17,
    name: "Dashboard",
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    id: 18,
    name: "Dashboard",
    path: "/dashboard/:id",
    component: <Dashboard />,
  },
  {
    id: 19,
    name: "Single Job",
    path: "/jobs/:jobId",
    component: <SingleJobs />,
  },
  {
    id: 25,
    name: "Demo",
    path: "/demo",
    component: <Demo />,
  },

  {
    id: 23,
    name: "Page Not Found",
    path: "*",
    component: <PageNotFound />,
  },
];