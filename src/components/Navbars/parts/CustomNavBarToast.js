const CustomToast = ({ text, text2, text3, link }) => (
  <div
    style={{
      background: "#yourColor",
      color: "#otherColor",
    }}
  >
    {text}
    {link && (
      <>
        <br />
        <br />

        <div
          style={{
            textAlign: "center",
            border: "1.5px solid black",
            borderRadius: 6,
            backgroundColor: "yellow",
            padding: 6,
          }}
        >
          <a
            href={link}
            style={{ color: "blue" }}
            target="_blank"
            rel="noreferrer"
          >
            Watch this quick Video!
          </a>
        </div>
      </>
    )}

    {text2 && (
      <>
        <br />
        <br />
        {text2}
      </>
    )}

    {text3 && (
      <>
        <br />
        <br />
        {text3}
      </>
    )}
  </div>
);

export default CustomToast;
