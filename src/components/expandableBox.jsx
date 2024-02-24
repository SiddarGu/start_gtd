import React from "react";

class ExpandableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            data: [],
            searchQuery: "",
        };
    }

    componentDidMount() {
        this.setState({ data: this.props.data });
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    filteredData = () => {
        if (!this.state.data) return [];
        const { data, searchQuery } = this.state;
        if (!searchQuery) return data;

        return data.filter(
            (article) =>
                article.article_id
                    .toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                article.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                article.publication_date
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        );
    };

    render() {
        const { expanded, data } = this.state;

        if (!data)
            return (
                <div
                    style={{
                        border: "1px solid black",
                        margin: "10px",
                        padding: "10px",
                        position: "relative",
                    }}
                >
                    <div
                        onClick={this.toggleExpand}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                        {`${this.props.name}: no data`} &nbsp;
                        <span
                            style={{
                                float: "right",
                                transform: expanded
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                                transition: "transform 0.3s",
                            }}
                        >
                            ▼
                        </span>
                    </div>
                    {expanded && (
                        <div style={{ margin: "10px 0" }}>No data available</div>
                    )}
                </div>
            );

        return (
            <div
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                    position: "relative",
                }}
            >
                <div
                    onClick={this.toggleExpand}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                    {`${this.props.name}: ${data.length} articles`} &nbsp;
                    <span
                        style={{
                            float: "right",
                            transform: expanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s",
                        }}
                    >
                        ▼
                    </span>
                </div>
                {expanded && (
                    <>
                        <input
                            type="text"
                            placeholder="Search by ID, Title, or Date"
                            value={this.state.searchQuery}
                            onChange={this.handleSearch}
                            style={{
                                margin: "10px 0",
                                padding: "8px",
                                width: "calc(100% - 16px)",
                            }}
                        />
                        <table>
                            <thead>
                                <tr>
                                    <th>Article ID</th>
                                    <th>Article Title</th>
                                    <th>Publication Date</th>
                                    <th>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.filteredData().map((article) => (
                                    <tr key={article.article_id}>
                                        <td>
                                            <a
                                                href={`/articles/${article.article_id}`}
                                            >
                                                {article.article_id}
                                            </a>
                                        </td>
                                        <td>{article.title}</td>
                                        <td>{article.publication_date}</td>
                                        <td>{article.source}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        );
    }
}

export default ExpandableBox;
