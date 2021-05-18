const showName = document.querySelector("#textinput");
document.querySelector("input").addEventListener('input', async () => {
    try {
        // removes all images and ratings in case of an input change
        const divs = document.querySelectorAll("#div");
        for (div of divs) {
            div.remove();
        }
        // removes the paragraph in case the last input change resulted in no results
        const p = document.querySelector("p");
        if (p !== null) {
            p.remove();
        }
        const val = showName.value;
        // The following API is provided by TVMAZE
        const result = await axios.get(`http://api.tvmaze.com/search/shows?q=${val}`);
        const datArr = result.data;
        const image = [];
        const rating = [];
        const spans = [];
        const divsArr = [];
        let num = 0;
        // In case of no matched search results tells the user that no shows were found
        if (datArr.length === 0 && val !== '') {
            const paragraph = document.createElement("P");
            paragraph.innerText = "Sorry, no such TV show was found :(";
            document.body.append(paragraph);
        } else {
            // goes through the images of all tv shows matching the input and displays 
            //  their images and rating data on webpage
            for (dat of datArr) {
                if (dat.show.image !== null) {
                    divsArr[num] = document.createElement("div");
                    divsArr[num].id = "div";
                    document.body.append(divsArr[num]);
                    image[num] = document.createElement("IMG");
                    image[num].src = dat.show.image.medium;
                    document.querySelectorAll("#div")[num].append(image[num]);
                    rating[num] = document.createElement("div");
                    rating[num].id = "div2";
                    document.querySelectorAll("#div")[num].append(rating[num]);
                    if (dat.show.rating.average !== null) {
                        document.querySelectorAll("#div2")[num].classList.add("rating");
                        for (let i = 0; i < 5; i++) {
                            spans[i] = document.createElement("span");
                            document.querySelectorAll("#div2")[num].append(spans[i])
                            spans[i].classList.add("fa", "fa-star");
                            if (i + 1 < dat.show.rating.average / 2) {
                                spans[i].classList.add("checked");
                            }
                        }
                    } else {
                        const noRating = document.createElement("p");
                        noRating.id = "p";
                        noRating.innerText = "No Rating";
                        document.querySelectorAll("#div2")[num].append(noRating);

                    }
                    num++;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
})
