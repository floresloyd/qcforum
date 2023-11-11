import { useState } from "react";
import Searchbar from "../components/Searchbar";
import { supabase } from "../Client";
import Card from "../components/Card";

function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async (searchType, searchTerm) => {
    try {
      let query = supabase.from("Posts").select("*");

      switch (searchType) {
        case "professor":
          query = query.ilike("p_lastname", `%${searchTerm}%`);
          break;
        case "class":
          query = query.ilike("coursecode", `%${searchTerm}%`);
          break;
        case "postTitle":
          query = query.ilike("title", `%${searchTerm}%`);
          break;
        default:
          // Handle default case or error
          break;
      }

      const { data, error } = await query;

      if (error) throw error;

      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    console.log("test" + searchResults[0].title);
  };

  return (
    <div>
      <div>
        <Searchbar onSearch={onSearch} />
        {/* Optionally render search results here */}
      </div>
      <div className="container margin-top font-color">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((search, index) => (
            <Card
              key={index}
              id={searchResults[index].id}
              title={searchResults[index].title}
              subject={searchResults[index].subject}
              code={searchResults[index].coursecode}
              professor={
                searchResults[index].p_firstname +
                " " +
                searchResults[index].p_lastname
              }
              date={searchResults[index].created_at}
              post={searchResults[index].comment}
              likes={searchResults[index].likes}
              context={"recent"}
            />
          ))
        ) : (
          <h2 className="no-result-h1">
            {
              "Search by :  Professor Last Name, CourseCode (EX: CSCI), or Post title "
            }
          </h2>
        )}
      </div>
    </div>
  );
}

export default Search;
