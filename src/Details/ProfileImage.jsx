const ProfileImage = ({ src, alt, add }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`m-1 h-[8em] w-[8em]  rounded-full border-2 border-black bg-white object-contain p-1 ${add}`}
    />
  );
};

export default ProfileImage;
