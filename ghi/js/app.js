function createCard(name, description, pictureUrl, startDate, endDate, location) {
    return `
      <div style="margin:10px; max-width: 400px;" class="col card shadow p-3 mb-5 bg-white rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted"> ${location} </h6>
          <p class="card-text">${description}</p>
          <hr>
          <p> ${startDate} - ${endDate} </p>
        </div>
      </div>
    `;
  }


window.addEventListener('DOMContentLoaded', async () => {

        const url = "http://localhost:8000/api/conferences/";

        try {
            const response = await fetch(url);

            if (!response.ok) {
              // Figure out what to do when the response is bad
            } else {
              const data = await response.json();

            //   const conference = data.conferences[0];
            //   const nameTag = document.querySelector(".card-title");
            //   nameTag.innerHTML = conference.name;

            //   const detailUrl = `http://localhost:8000${conference.href}`;
            //   const detailResponse = await fetch(detailUrl);
            //   if (detailResponse.ok) {
            //     const details = await detailResponse.json();

            //     const confDetails = details.conference;
            //     const descTag = document.querySelector(".card-text");
            //     descTag.innerHTML = confDetails.description

            //     const imageTag = document.querySelector(".card-img-top");
            //     imageTag.src = details.conference.location.picture_url;
            //   }

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;

                    const starts = details.conference.starts;
                    const startDate = new Date(starts).toLocaleDateString();
                    const ends = details.conference.ends;
                    const endDate = new Date(ends).toLocaleDateString();

                    const location = details.conference.location.name;

                    const html = createCard(title, description, pictureUrl, startDate, endDate, location);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                }
              }

            }
          } catch (e) {
            console.error(e);
            // Figure out what to do if an error is raised
          }

        });
