
        $(document).ready(function () {
            show_bucket();
            show_comment()
        });

    
        function show_bucket(){
            $.ajax({
                type: "GET",
                url: "/bucket",
                data: {},
                success: function (response) {
                    let rows = response['buckets']
                    for (let i =0; i < rows.length; i++){
                        let bucket = rows[i]['bucket']
                        let num = rows[i]['num']
                        let done = rows[i]['done']
                        let temp_html = ``
                        if (done == 0){
                            temp_html = `
        <li>
            <h2>✅ ${bucket}</h2>
            <button onclick="done_bucket(${num})" type="button" class="btn btn-outline-primary">완료!</button>
        </li>`}else{
                            temp_html= `
        <li>
            <h2 class="done">✅ ${bucket}</h2>
        </li>`
                        }
                        $('#bucket-list').append(temp_html)
                    }
                }
            });
        }
        function save_bucket(){
            let bucket = $('#bucket').val()
            $.ajax({
                type: "POST",
                url: "/bucket",
                data: {bucket_give:bucket},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }
        function done_bucket(num){
            $.ajax({
                type: "POST",
                url: "/bucket/done",
                data: {num_give:num},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }
        $(document).ready(function(){
            $.ajax({
              type: "GET",
              url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
              data: {},
              success: function(response){
                  $('#temp').text(response['temp'])
                }
              })
        });

        <!-- 모달창 처리 시작 -->
        $('#myModal').on('shown.bs.modal', function () {
          $('#myInput').trigger('focus')
        })
        // <!-- 모달창 처리 끝-->



        function save_comment() {
            let name = $('#name').val()
            let comment = $('#comment').val()

            $.ajax({
                type: "POST",
                url: "/guestbook",
                data: {'name_give':name, 'comment_give':comment},
                success: function (response) {
                    alert(response["msg"])
                    window.location.reload()
                }
            });
        }
        function show_comment() {
            $('#comment-list').empty()
            $.ajax({
                type: "GET",
                url: "/guestbook",
                data: {},
                success: function (response) {
                    let rows = response['comments']
                    for (let i = 0; i < rows.length; i++) {
                        let name = rows[i]['name']
                        let comment = rows[i]['comment']

                        let temp_html = `<div class="card">
                                            <div class="card-body">
                                                <blockquote class="blockquote mb-0">
                                                    <p>${comment}</p>
                                                    <footer class="blockquote-footer">${name}</footer>
                                                </blockquote>
                                            </div>
                                        </div>`
                        $('#comment-list').append(temp_html)
                    }
                }
            });
        }
        const clock = document.getElementById("clock");
        function getClock(){
          const date = new Date()
          const hour = String(date.getHours()).padStart(2,"0");
          const minutes = String(date.getMinutes()).padStart(2,"0");
          const second = String(date.getSeconds()).padStart(2,"0");//number이기 때문에 padStart X, string으로 변환해야함
          clock.innerText = `${hour}:${minutes}:${second}`;
          }
        getClock();
        setInterval(getClock, 1000);


