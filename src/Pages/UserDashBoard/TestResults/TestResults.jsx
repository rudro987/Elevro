import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaFilePdf } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const TestResults = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: testResults = [], isPending: loading } = useQuery({
    queryKey: ["testResults", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedTests/result?email=${user.email}`);
      return res.data;
    },
  });

  const handleDownload = (pdfUrl) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'test_result.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (testResults.length === 0)
    return (
      <div className="text-center text-2xl font-semibold">
        <h1>You do not have any test results available yet</h1>
      </div>
    );

  if (loading) {
    return <Loader></Loader>;
  }


  return (
    <div>
      <h1 className="text-2xl font-semibold pb-10">Test Results</h1>
      <div className="bg-white rounded-lg w-full h-full pb-12 pt-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-center text-blackTest text-sm">
              <th></th>
              <th>View Result</th>
              <th>Test Name</th>
              <th>Report Status</th>
              <th>Print or Download</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map((result, idx) => (
              <tr key={result._id} className="text-center text-lg">
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center w-12 h-12 mx-auto overflow-hidden">
                    {result.report_link && (
                      <a href={result.report_link} target="_blank" rel="noopener noreferrer">
                      <FaFilePdf className="text-5xl text-primary hover:text-primaryHover" />
                      </a>
                    )}
                  </div>
                </td>
                <td>{result.test_name}</td>
                <td>{result.report_status}</td>
                <td>
                  <span onClick={() => handleDownload(result.report_link)} className="btn btn-lg bg-secondary hover:bg-secondaryHover text-white">
                  <FaDownload />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResults;
