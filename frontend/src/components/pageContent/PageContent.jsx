import "./pageContent.css";

const PageContent = ({ type, children, headerTitle = "", actions }) => {
  return (
    <div className="page-content">
      <header className="page-content_header">
        <h2>{headerTitle}</h2>
        <div className="page-content_header_actions">{actions}</div>
      </header>
      <main
        className={
          type === "card"
            ? "page-content_main"
            : type === "list"
            ? "page-content_list"
            : "page-content_form"
        }
      >
        {children}
      </main>
    </div>
  );
};

export default PageContent;