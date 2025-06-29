const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      style={{ outline: "none" }}
      onClick={scrollToTop}
      className="scroll-button "
    >
      <img
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          backgroundColor: "grey",
          alignItems: "center",
        }}
        src="/arrow_up_icon.png"
      ></img>
    </button>
  );
};
export default BackToTopButton;
