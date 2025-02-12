$(function(){

    let allItems = []; //전체 상품 데이터를 저장할 배열 변수

    $('.category-btn').click(function(e){
        e.preventDefault();
        const category = $(this).data('category');
        renderItem(category);
    });

    $.getJSON("js/list.json", (rs) => {
       allItems = rs; //전체 데이터를 저장
       renderItem('ALL');
    });   

    //상품 출력 함수
    function renderItem(cate) {
        let tags = "";

        //필터링 category가 'ALL'이면 전체출력 아니면 필터링
        let filteredItems = cate === 'ALL' ? allItems 
                                               : allItems.filter(item=>
                                                      item.category === cate);
        $.each(filteredItems, (index, item)=> {
          let ev = "";  
        
          $.each(item.event, (index,eve)=>{
            let eveText;
               if(eve == "best"){
                  eveText = "BEST";
               }else if(eve == "today"){
                  eveText = "오늘출발";
               }else if(eve == "new"){
                  eveText = "신상";
               }
               ev += `<span class="${eve}">${eveText}</span>`;
            });
               
            tags += `
                    <div class="col-md-3 col-12">
                        <div class="imgbox">
                           <div class="imginner">
                              <img src="images/pd/${item.img}" alt="${item.img}">
                           </div>
                        </div>
                        <div class="textbox">
                           <div class="btnbox my-2">
                              ${ev}
                           </div> 
                           <h3 class="pd-title my-2">${item.title} </h3>
                           <p class="pd-desc my-2">${item.desc}</p>
                           <p class="pd-price my-2"><del>${item.delPrice}</del> ${item.price}</p>
                           <p class="pd-review">리뷰 : ${item.review}</p>
                        </div> 
                     </div>
               `;
               ev = "";
            });
            $('#row').html(tags);
    }

}); //jquery