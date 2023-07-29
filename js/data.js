const $container=$('.gallery-wrap');
const $loadMoreBtn=$('.loadMoreBt');
let $addItemCount=3;
let $added=0;
let $allData=[];
let $filter=$('#gallery-filter');
let $filterdData=[];


$.getJSON('./data/video.json', function(data){
    
    $allData=data;
   // console.log($allData)
    $filterdData=$allData
    addItem();
    $loadMoreBtn.click(addItem);
    $filter.on('change', 'input[type="radio"]' , filterItems);
})
function addItem(data){
    let element=[];
    let slicedData;
    slicedData=$filterdData.slice($added,$added += $addItemCount);
    //console.log(slicedData)

    $.each(slicedData, function(index, item){
        const fileExtension=item.video.split('.').pop().toLowerCase();
        //console.log(fileExtension)
        const isMp4=fileExtension==='mp4';
        //console.log(isMp4)
        const sw=isMp4 ? (`<video autoplay muted loop src=${item.video}></video>`) : (`<img src=${item.video} />`);

        let itemHTML=`
            <li>
                <div>
                    <a href="javascript:" class="galleryBt">
                        <span class="g-video">
                            ${sw}
                        </span>
                        <span class="g-color"></span>
                        <span class="g-title">
                            <span><strong>${item.title}</strong></span>
                            <span><b>${item.description}</b></span>
                            <span><i class="exploreBt">Explore</i></span>
                        </span>
                    </a>
                </div>
            </li>
        `;
        element.push($(itemHTML).get(0));

        if($added< $allData.length){
            $loadMoreBtn.text('Load More');
            
        }else{
            $loadMoreBtn.css({background:'#384244', color:'#dee4e3', border:'1px solid #5e686a'}).text('END');
        }
        
       
    })
    $container.append(element)
    
    if($added< $filterdData.length){
        $loadMoreBtn.text('Load More');
    }else{
        $loadMoreBtn.css({background:'#384244', color:'#dee4e3', border:'1px solid #5e686a'}).text('END');
    }
    

}
function filterItems(){
    let key=$(this).val();
    $filterdData=[];
    $added=0;
    $container.empty();
    $added=0;

    if(key=='all'){
        $filterdData=$allData;
    }else{
        $filterdData=$.grep($allData, function(item){
            return item.category === key;
        })
    }
   
    addItem(true);
}