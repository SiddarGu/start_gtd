import React from "react";

class ArticlesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchQuery: "",
        };
    }

    componentDidMount() {
        this.setState({ data: this.props.data });
    }

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
        const { data } = this.state;

        if (!data)
            return (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Article ID</th>
                                <th>Article Title</th>
                                <th>Publication Date</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                    </table>
                </>
            );

        return (
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
                                    <a href={`/articles/${article.article_id}`}>
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
        );
    }
}

export default ArticlesTable;
