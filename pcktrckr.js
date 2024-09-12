// package-tracker

//section-package-tracker

document.addEventListener("DOMContentLoaded", function() {
    var parentElement = document.body;
    
    parentElement.addEventListener("click", function(event) {
        var clickedElement = event.target;
        let selectedClass = undefined; // Declare text variable outside the loop
        
        while (clickedElement !== null) {
            if (clickedElement.classList.contains("section-package-tracker")) {
                selectedClass = document.querySelector(".section-package-tracker");
                break; 
            } else if (clickedElement.classList.contains("package-tracker")) {
                selectedClass = document.querySelector(".package-tracker");
                break; 
            }
            clickedElement = clickedElement.parentElement; 
        }
        
        if (selectedClass !== undefined) {
            if (!selectedClass.hasEventListener) {
                selectedClass.hasEventListener = true; 
                    selectedClass.addEventListener("click", function(event) {
                        if (event.target.matches("#button-package")) {
                            event.preventDefault(); 
                            event.target.disabled = true;
                            // Clearing previous data
                            selectedClass.querySelector('#wrong-tracking-no').classList.add('hide');
                            selectedClass.querySelector('#step1').classList.remove("completed");
                            selectedClass.querySelector('#line1').classList.remove("completed");
                            selectedClass.querySelector('#status1').classList.remove("completed");
                            selectedClass.querySelector('#step2').classList.remove("completed");
                            selectedClass.querySelector('#line2').classList.remove("completed");
                            selectedClass.querySelector('#status2').classList.remove("completed");
                            selectedClass.querySelector('#step3').classList.remove("completed");
                            selectedClass.querySelector('#line3').classList.remove("completed");
                            selectedClass.querySelector('#status3').classList.remove("completed");
                            selectedClass.querySelector('#step4').classList.remove("completed");
                            selectedClass.querySelector('#status4').classList.remove("completed");
                            selectedClass.querySelector('#date').textContent = '-';
                            selectedClass.querySelector('#time').textContent = '-';
                            selectedClass.querySelector('#status-description').textContent = '-';
                            selectedClass.querySelector('#carrier').textContent = '-';
                            selectedClass.querySelector('#shipped-from').textContent = '-';
                            selectedClass.querySelector('#shipped-on').textContent = '-';
                            selectedClass.querySelector('#delivery-to').textContent = '-';
                            selectedClass.querySelector('#delivered-on').textContent = '-';
                            const detectUrl = 'https://www.kd100.com/api/v1/carriers/detect';
                            const corsProxyUrl = 'https://shopboxproxy-53d167b6af49.herokuapp.com/';
                            const tracking_number =  selectedClass.querySelector('#tracking-number').value;
                            if(tracking_number.trim() !== null && tracking_number.trim() !== ''){
                                selectedClass.querySelector('#tracking-loader').classList.remove('hide');
                                const api_key = "iDOrYPPxBFXV1944";
                                const api_secret = "762339ef9ecd42ac9f7b26a9dfbe6245";
                                const detect_payload = {
                                "tracking_number": tracking_number.toString()
                                };
                                const detect_string =  JSON.stringify(detect_payload) + api_key + api_secret;
                                const detect_md5Hash = CryptoJS.MD5(detect_string).toString().toUpperCase();
                                const detect_headers = {
                                    'Content-Type': 'application/json',
                                    'API-Key': 'iDOrYPPxBFXV1944',
                                    'signature': detect_md5Hash.toString()
                                };
                                fetch(corsProxyUrl + detectUrl, {
                                method: 'POST',
                                headers: detect_headers,
                                body: JSON.stringify(detect_payload)
                                })
                                .then(response => {
                                    if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    const track_url = 'https://www.kd100.com/api/v1/tracking/realtime';
                                    console.log(data);
                                    if(Object.keys(data.data).length !== 0){
                                        const carrier_id = data.data[0].carrier_id;
                                        const carrier_name = data.data[0].carrier_name;
                                        const track_payload = {
                                            "area_show": 1,
                                            "carrier_id": carrier_id.toString(),
                                            "tracking_number": tracking_number.toString()
                                        };
                                        const track_string =  JSON.stringify(track_payload) + api_key + api_secret;
                                        const track_md5Hash = CryptoJS.MD5(track_string).toString().toUpperCase();
                                        const track_headers = {
                                            'Content-Type': 'application/json',
                                            'API-Key': 'iDOrYPPxBFXV1944',
                                            'signature': track_md5Hash.toString()
                                        };
                                        fetch(corsProxyUrl + track_url, {
                                            method: 'POST',
                                            headers: track_headers,
                                            body: JSON.stringify(track_payload)
                                        })
                                        .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        return response.json();
                                        })
                                        .then(data => {
                                            selectedClass.querySelector('#tracking-loader').classList.add('hide');
                                            if(Object.keys(data).length !== 0 && data.code !== 60101){
                                                let item_data = JSON.stringify(data.data.items);
                                                item_data = JSON.parse(item_data);  
                                                const statusCodes = Object.values(item_data).map(item_data => item_data.order_status_code);
                                                const latest_status = statusCodes[0];
                                                if(Number(latest_status) === 1){
                                                    selectedClass.querySelector('#step1').classList.add("completed");
                                                    selectedClass.querySelector('#line1').classList.add("completed");
                                                    selectedClass.querySelector('#status1').classList.add("completed");
                                                }else if(Number(latest_status) === 0 || Number(latest_status) === 2){
                                                    selectedClass.querySelector('#step1').classList.add("completed");
                                                    selectedClass.querySelector('#line1').classList.add("completed");
                                                    selectedClass.querySelector('#status1').classList.add("completed");
                                                    selectedClass.querySelector('#step2').classList.add("completed");
                                                    selectedClass.querySelector('#line2').classList.add("completed");
                                                    selectedClass.querySelector('#status2').classList.add("completed");
                                                }else if(Number(latest_status) === 5){
                                                    selectedClass.querySelector('#step1').classList.add("completed");
                                                    selectedClass.querySelector('#line1').classList.add("completed");
                                                    selectedClass.querySelector('#status1').classList.add("completed");
                                                    selectedClass.querySelector('#step2').classList.add("completed");
                                                    selectedClass.querySelector('#line2').classList.add("completed");
                                                    selectedClass.querySelector('#status2').classList.add("completed");
                                                    selectedClass.querySelector('#step3').classList.add("completed");
                                                    selectedClass.querySelector('#line3').classList.add("completed");
                                                    selectedClass.querySelector('#status3').classList.add("completed");
                                                }else if(Number(latest_status) === 3){
                                                    selectedClass.querySelector('#step1').classList.add("completed");
                                                    selectedClass.querySelector('#line1').classList.add("completed");
                                                    selectedClass.querySelector('#status1').classList.add("completed");
                                                    selectedClass.querySelector('#step2').classList.add("completed");
                                                    selectedClass.querySelector('#line2').classList.add("completed");
                                                    selectedClass.querySelector('#status2').classList.add("completed");
                                                    selectedClass.querySelector('#step3').classList.add("completed");
                                                    selectedClass.querySelector('#line3').classList.add("completed");
                                                    selectedClass.querySelector('#status3').classList.add("completed");
                                                    selectedClass.querySelector('#step4').classList.add("completed");
                                                    selectedClass.querySelector('#status4').classList.add("completed");
                                                }
                                                let item_latest = JSON.stringify(data.data.items[0]);
                                                item_latest = JSON.parse(item_latest);
                                                let litem_current_time = item_latest.time;
                                                const litem_current_status = item_latest.order_status_description;
                                                const litem_current_location = item_latest.location;
                                                const latest_dateTime = new Date(litem_current_time);
                                                const litem_date = latest_dateTime.getDate();
                                                const litem_month = latest_dateTime.toLocaleString('en-US', { month: 'long' });;
                                                const litem_year = latest_dateTime.getFullYear();
                                                const litem_weekday = latest_dateTime.toLocaleDateString('en-US', { weekday: 'long'});
                                                litem_current_time = latest_dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
                                                const litem_current_date = `${litem_date} ${litem_month} ${litem_year}`;
                                                const delivered_on = `${litem_weekday}, ${(item_latest.time).split(' ')[0]} ${litem_current_time}`;
                                                let shipped_on = undefined;
                                                let shipped_from = undefined;
                                                let item_first = JSON.stringify(data.data.items[data.data.items.length - 1]);
                                                item_first = JSON.parse(item_first);
                                                shipped_from = item_first.location;
                                                if(shipped_from !== null){
                                                    const first_dateTime = new Date(item_first.time);
                                                    const fitem_weekday = first_dateTime.toLocaleDateString('en-US', { weekday: 'long'});
                                                    shipped_on = `${fitem_weekday}, ${(item_first.time).split(' ')[0]}`;
                                                }else{
                                                    let item_sec = JSON.stringify(data.data.items[data.data.items.length - 2]);
                                                    item_sec = JSON.parse(item_sec);
                                                    shipped_from = item_sec.location;
                                                    const sec_dateTime = new Date(item_first.time);
                                                    const sitem_weekday = sec_dateTime.toLocaleDateString('en-US', { weekday: 'long'});
                                                    shipped_on = `${sitem_weekday}, ${(item_sec.time).split(' ')[0]}`;
                                                }
                                                // Date
                                                if(litem_current_date !== null && litem_current_date !== ''){
                                                    selectedClass.querySelector('#date').textContent = litem_current_date;
                                                }else{
                                                    selectedClass.querySelector('#date').textContent = '-';
                                                }
                                                // Time
                                                if(litem_current_time !== null && litem_current_time !== ''){
                                                    selectedClass.querySelector('#time').textContent = litem_current_time;
                                                }else{
                                                    selectedClass.querySelector('#time').textContent = '-';
                                                }
                                                // Status
                                                if(litem_current_status !== null && litem_current_status !== ''){
                                                    selectedClass.querySelector('#status-description').textContent = litem_current_status;
                                                }else{
                                                    selectedClass.querySelector('#status-description').textContent = '-';
                                                }
                                                // Carrier
                                                if(litem_current_status !== null && litem_current_status !== ''){
                                                    selectedClass.querySelector('#carrier').textContent = carrier_name;
                                                }else{
                                                    selectedClass.querySelector('#carrier').textContent = '-';
                                                }
                                                // shipped from
                                                if(shipped_from !== null && shipped_from !== ''){
                                                    selectedClass.querySelector('#shipped-from').textContent = shipped_from;
                                                }else{
                                                    selectedClass.querySelector('#shipped-from').textContent = '-';
                                                }
                                                // shipped on
                                                if(shipped_on !== null && shipped_on !== ''){
                                                    selectedClass.querySelector('#shipped-on').textContent = shipped_on;
                                                }else{
                                                    selectedClass.querySelector('#shipped-on').textContent = '-';
                                                }
                                                // Delivered to
                                                if(litem_current_location !== null && litem_current_location !== '' && Number(latest_status) === 3){
                                                    selectedClass.querySelector('#delivery-to').textContent = litem_current_location;
                                                }else{
                                                    selectedClass.getElemequerySelectorntById('#delivery-to').textContent = '-';
                                                }
                                                // Delivered on
                                                if(delivered_on !== null && delivered_on !== '' && Number(latest_status) === 3){
                                                    selectedClass.querySelector('#delivered-on').textContent = delivered_on;
                                                }else{
                                                    selectedClass.querySelector('#delivered-on').textContent = '-';
                                                }
                                            }else{
                                                selectedClass.querySelector('#tracking-loader').classList.add('hide');
                                                selectedClass.querySelector('#wrong-tracking-no').textContent = "No Data Found";
                                                selectedClass.querySelector('#wrong-tracking-no').classList.remove('hide');
                                            }
                                        })
                                        .catch(error => {
                                            selectedClass.querySelector('#tracking-loader').classList.add('hide');
                                            selectedClass.querySelector('#wrong-tracking-no').textContent = "Something Went Wrong !!!";
                                            selectedClass.querySelector('#wrong-tracking-no').classList.remove('hide');
                                            console.error(error);
                                        });
                                    }else{
                                        selectedClass.querySelector('#tracking-loader').classList.add('hide');
                                        selectedClass.querySelector('#wrong-tracking-no').textContent = "No Data Found";
                                        selectedClass.querySelector('#wrong-tracking-no').classList.remove('hide');
                                    }
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            }else{
                                selectedClass.querySelector('#wrong-tracking-no').textContent = "Please Enter Tracking Number";
                                selectedClass.querySelector('#wrong-tracking-no').classList.remove('hide');
                            }             
                        }
                });
            }
        }
        
        if (selectedClass !== undefined){
            selectedClass.querySelector('#button-package-history').onclick = function(){
                const tracking_number =  selectedClass.querySelector('#tracking-number').value;
                const redirect_url = `https://www.packagetrackr.com/track/${tracking_number}`;
                console.log(redirect_url);
                const packagetrackr = window.open(redirect_url, '_blank');
                packagetrackr.focus();
            }
        }

        let tabLinks = selectedClass.querySelectorAll(".tab-link");
        const bubbles = selectedClass.querySelectorAll(".progress-bubble");
        const bars = selectedClass.querySelectorAll(".progress-bar");
        // loop through all tab_links
        tabLinks.forEach((tabLink, index) => {
        // listen for click events on each one.
        tabLink.addEventListener("click", () => {
            // remove the completed class from ALL occurences (can optimize this later if you want)
            bubbles.forEach((bubble) => bubble.classList.remove("completed"));
            bars.forEach((bar) => bar.classList.remove("completed"));
            // add the completed class up to our active step
            for (let i = 0; i <= index; i++) {
            bubbles[i].classList.add("completed");
            bars[i].classList.add("completed");
            }
        });
        });
    });
});
