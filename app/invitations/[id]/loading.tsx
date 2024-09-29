import { jersey_10 } from "@/app/fonts";

const Loading = () => {
  return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <div className="text-center text-white text-3xl">
              {/* <div>Loading..</div> */}
              <div className={`mt-4 ${jersey_10.className}`}>⁓ DESIGNED BY BACHELORS FOR THE BACHELORS ⁓</div>
          </div>
      </div>
  );
};

export default Loading;
