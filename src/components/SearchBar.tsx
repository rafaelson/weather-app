export default function SearchBar() {
  return (
    <input
      type={"search"}
      placeholder={"Search"}
      css={{
        width: "620px",
        minHeight: "80px",
        opacity: "50%",
        borderRadius: "55px",
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #585858",
        fontFamily: "Poppins",
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "45px",
        paddingLeft: "15px",
        color: "rgba(255, 255, 255, 0.3)",
      }}
    ></input>
  );
}
