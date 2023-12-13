function createCopyButton(jobDetails) {
    const newButton = document.createElement('button');
    newButton.id = 'copy-button';
    newButton.innerHTML = 'Copy to Clipboard';
    newButton.addEventListener('click', () => {
        var jobDetailsText = ''
        // query all the text inside the span elements
        let jobDetailsTextElements = jobDetails.querySelectorAll('span');
        jobDetailsTextElements.forEach((element) => {
            jobDetailsText += element.innerText + '\n';
        });

        copyTextToClipboard(jobDetailsText);

        // Change the button text to indicate that the text has been copied
        newButton.innerHTML = 'Copied!';
        newButton.style.backgroundColor = 'white';
        newButton.style.color = '#0073b1';
        newButton.style.border = '2px solid #0073b1';

        setTimeout(() => {
            resetButton();
        }, 2000);
    });

    function resetButton() {
        newButton.innerHTML = 'Copy to Clipboard';
        newButton.style.backgroundColor = '#0a66c2';
        newButton.style.color = 'white';
        newButton.style.border = 'none';
    }

    // Style the button
    newButton.style.backgroundColor = '#0a66c2'; // LinkedIn's brand color
    newButton.style.color = 'white';
    newButton.style.border = 'none';
    newButton.style.borderRadius = '15px'; // More rounded corners
    newButton.style.fontFamily = 'Arial, sans-serif';
    newButton.style.fontSize = '16px';
    newButton.style.fontWeight = 'bold';
    newButton.style.textAlign = 'center';
    newButton.style.display = 'inline-block';
    newButton.style.cursor = 'pointer';
    newButton.style.padding = '10px 15px';
    newButton.style.marginTop = '10px';
    newButton.style.marginBottom = '10px';
    newButton.style.textDecoration = 'none';
    newButton.style.transition = 'background-color 0.2s';
    newButton.style.outline = 'none';

    return newButton;
}

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Text successfully copied to clipboard');
    }).catch(function (error) {
        console.error('Error copying text: ', error);
    });
}

function getExperience(jobDetails) {
    var experiences = []
    let jobDetailsTextElements = jobDetails.querySelectorAll('li');
    jobDetailsTextElements.forEach((element) => {
        var regex = /((\d+)(\+?)|(\d+-\d+))\s*years?/g;
        var matches = element.innerText.match(regex);
        if (matches) {
            console.log(element.innerText);
            experiences.push(element.innerText);
        }
    });

    return experiences;
}

window.addEventListener('load', function () {
    const jobDetails = document.getElementById('job-details');
    if (jobDetails) {
        console.log('Job details found:', jobDetails);

        // Debounce function to limit the number of times the observer is called
        let debounceTimeout;
        const debounceDelay = 500;

        const debouncedLog = () => {
            if (debounceTimeout) {
                this.clearTimeout(debounceTimeout);
            }

            debounceTimeout = this.setTimeout(() => {
                console.log('Job details changes are now stable');
                // Locate the target <h2> element "About this job"
                const target = jobDetails.querySelector('h2');
                if (target) {

                    // Create a new button element
                    const newButton = createCopyButton(jobDetails);

                    var experiences = getExperience(jobDetails);
                    var ul = document.createElement('ul');

                    if (experiences.length > 0) {
                        // create a ul element to store the experiences
                        ul.id = 'ul-experiences'
                        for (var i = 0; i < experiences.length; i++) {
                            var li = document.createElement('li');
            
                            // add bullet points to each li
                            li.style.listStyleType = 'disc';
                            li.appendChild(document.createTextNode(experiences[i]));
                            ul.appendChild(li);
                        }
            
                        // add corner radius with border for ul 
                        ul.style.border = '1.5px solid #0073b1';
                        ul.style.borderRadius = '15px';
                        ul.style.padding = '10px 15px';
                        ul.style.marginTop = '10px';
                        ul.style.marginBottom = '10px';
                        ul.style.listStyleType = 'none';
            
                        // insert ul below the button 

                    }


                    // Insert the new button before the target element
                    target.parentNode.insertBefore(newButton, target);
                    target.parentNode.insertBefore(ul, target);

                }

            }, debounceDelay);
        };

        // Add Observer to detect when the job details change
        const observer = new MutationObserver(function (mutations) {
            var button = document.getElementById('copy-button');
            if (button) {
                button.remove();
            }
            var ul = document.getElementById('ul-experiences');
            if (ul) {
                ul.remove();
            }
            debouncedLog();
        });

        // Start observing the target node for configured mutations
        observer.observe(jobDetails, { attributes: true, childList: false, subtree: false });

    }
})