import catImg from "../../assets/banner.jpg";

function BannerAd() {
  return (
    <div className="max-w-4xl mx-auto p-4 flex items-center justify-center">
      <div className="flex items-center">
        <img
          src={catImg}
          alt="Banner"
          className="w-[600px] h-auto rounded-2xl shadow-md object-cover"
        />
      </div>
    </div>
  );
}

export default BannerAd;
