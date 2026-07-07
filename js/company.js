const API_URL = "https://script.google.com/macros/s/AKfycbwP-jab4KFiOaZpb0dXL2Mcn02wkSAy5dYwurKK_oakaP_vvbrHdWqPtXq7RKPj1NSv/exec";

// Get company name from URL
const params = new URLSearchParams(window.location.search);
const companyName = params.get("company");

// HTML elements
const companyNameElement = document.getElementById("company-name");
const companyRatingElement = document.getElementById("company-rating");
const reviewCountElement = document.getElementById("review-count");
const reviewsDiv = document.getElementById("reviews");

fetch(API_URL)
    .then(response => response.json())
    .then(data => {

        // Get reviews for this company
        const reviews = data.filter(review => review.company_name === companyName);

        // Sort newest first
        reviews.sort((a, b) =>
            new Date(b.employment_end) - new Date(a.employment_end)
        );

        // Company title
        companyNameElement.textContent = companyName;

        // Review count
        reviewCountElement.textContent = `${reviews.length} Employee Review${reviews.length !== 1 ? "s" : ""}`;

        // Average rating
        const averageRating =
            (
                reviews.reduce((sum, review) => sum + Number(review.overall_rating), 0)
                / reviews.length
            ).toFixed(1);

        companyRatingElement.textContent = `⭐ ${averageRating}`;

        // Clear reviews
        reviewsDiv.innerHTML = "";

        // Display reviews
        reviews.forEach(review => {

            const startDate = new Date(review.employment_start).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            });

            const endDate = new Date(review.employment_end).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric"
            });

            reviewsDiv.innerHTML += `
                <div class="company-card">

                    <strong>
                        ${review.account}
                    </strong>
                    |
                    ${review.job_title}
                    |
                    ${review.branch}
                    |
                    ⭐ ${review.overall_rating}

                    <br><br>

                    ${startDate} → ${endDate}

                    <br><br>

                    <strong>Pros</strong>

                    <p>${review.pros}</p>

                    <hr>

                    <strong>Cons</strong>

                    <p>${review.cons}</p>

                </div>
            `;

        });

    })
    .catch(error => console.error(error));