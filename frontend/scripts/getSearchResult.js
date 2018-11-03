var image;

function getSearchResults()
{
    var input = localStorage.getItem("search-query");
    console.log(input);
    if(input===null)
    {
        $(".search_result").html("");
        $("#content3").html("");
    }
    else
    {
        $(".search_result").html(
            "<h3 class='search_title'> Showing Results for :" +"<span class='input'>"+ input +"</span>" +"</h3>"+
            "<hr id='rule'>"
            );
        $.ajax(
        {
            type:'GET',
            url:"http://localhost/dbs_project/search/"+input+"/",
            dataType:'json',
            crossOrigin:'true',
            success : function(data,status)
            {
                $("#content3").html("");
                $.each(data,function(index,element)
                {
                    $("#content3").append(
                        "<div class='col-sm-3 content-block>"+
                            "<div class='media-left'>"+
                                "<a href='bookDetails.html?isbn="+element.book_isbn+"' data-toggle='popover' id='link_3-"+element.book_isbn+"'>"+
                                    "<img class='img-thumbnail content-img' id='cover-"+element.book_isbn+"' src="+image+">"+
                                "</a>"+
                            "</div>"+
                        "</div>"
                        );
                        getImage(element.isbn); 
                        $('[data-toggle="popover"]').popover({
                        container:'body',
                        html:true,
                        placement:'auto right',
                        trigger:'hover',
                        animation:true,
                        title: function()
                        {
                            var id = $(this).attr('id');
                            var popover_isbn = id.slice(7);
                            $.ajax(
                            {
                                type:'GET',
                                url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
                                crossOrigin:'true',
                                dataType:'json',
                                success : function(data,status)
                                {
                                    title = data[0].title;
                                }
                            });
                            return "<h4 class='popover_title'>" + title +"</h4>"
                        },
                        content : function()
                        {
                            var id = $(this).attr('id');
                            var popover_isbn = id.slice(7);
                            $.ajax(
                            {
                                type:'GET',
                                url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
                                crossOrigin:'true',
                                dataType:'json',
                                success:function(data,status)
                                {
                                    console.log(data);
                                    author = data[0].author_name;
                                    console.log(author);
                                    genre= data[0].format_type;
                                    console.log(genre);
                                    if(data[0].series == "")
                                    {
                                        series = "The book does not belong to any particular series";
                                    }
                                    else
                                    {
                                        series = data[0].series;
                                    }
                                    console.log(series);
                                    series_index=data[0].series_index;
                                    console.log(series_index);
                                    publisher = data[0].publisher_name;
                                    console.log(publisher);


                                }
                            });
                            return ("<p class='pop-content'> by : <span class='pop-detail'> "+ author + "</span></p><br> "+
                                        "<p class='pop-content'> Genre : <span class='pop-detail'>" + genre + "</span></p><br>" +
                                        "<p class='pop-content'> Publisher : <span class='pop-detail'> " + publisher + "</span></p><br>" +
                                        "<p class='pop-content'> Series : <span class='pop-detail'> " + series + "</span><br><br> Series Index :<span class='pop-detail'>"+series_index+" </span></p>"); 
                        }
                    });

                });
            },
            error : function(data)
            {
                $(".title").html("<h3 id='error-title'> Your search resulted empty </h3>");
                image = '../images/image-not-available.jpg';
            $("#cover-"+isbn).attr('src',image);
            }
        });
    }

}

function getImage(isbn)
{
    $.ajax(
    {
        type:'GET',
        url :'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn+'&key=AIzaSyC-xVPmWkCHyb67o0q50udhKQm6gFVmfb0&country=IN',
        dataType:'json',
        crossOrigin:'true',
        success : function(data,status)
        {
            for(i = 0; i<data.items.length;i++)
            {
                var book = data.items[i];
                image = book.volumeInfo.imageLinks.thumbnail;
            }
            $('#cover-'+isbn).attr('src',image);


        },
        error : function(data)
        {
            image = '../images/image-not-available.jpg';
            $("#cover-"+isbn).attr('src',image);
        }
    });
}

function getSearchResultsOnClick()
{
    var search = $("#search-box").val();
    var search_input = search.slice(0,3);
    $(".search_result").html(
        "<h3 class='search_title'> Showing Results for :" +"<span class='input'>"+ search +"</span>"+ "</h3>"+
        "<hr id='rule'>"
        );
    $("#rule").show();
    $.ajax(
    {
        type:'GET',
        url:"http://localhost/dbs_project/search/"+search+"/",
        dataType:'json',
        crossOrigin:'true',
        success : function(data,status)
        {
            $("#content3").html("");
            $.each(data,function(index,element)
            {
                $("#content3").append(
                    "<div class='col-sm-3 content-block>"+
                        "<div class='media-left'>"+
                            "<a href='bookDetails.html?isbn="+element.book_isbn+"' data-toggle='popover' id='link_3-"+element.book_isbn+"'>"+
                                "<img class='img-thumbnail content-img' id='cover-"+element.book_isbn+"' src="+image+">"+
                            "</a>"+
                        "</div>"+
                    "</div>"
                    );
                    getImage(element.book_isbn); 
                    $('[data-toggle="popover"]').popover({
                        container:'body',
                        html:true,
                        placement:'auto right',
                        trigger:'hover',
                        delay:{show:500,hide:500},
                        animation:true,
                        title: function()
                        {
                            var id = $(this).attr('id');
                            var popover_isbn = id.slice(7);
                            $.ajax(
                            {
                                type:'GET',
                                url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
                                crossOrigin:'true',
                                dataType:'json',
                                success : function(data,status)
                                {
                                    title = data[0].title;
                                }
                            });
                            return "<h4 class='popover_title'>" + title +"</h4>"
                        },
                        content : function()
                        {
                            var id = $(this).attr('id');
                            var popover_isbn = id.slice(7);
                            $.ajax(
                            {
                                type:'GET',
                                url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
                                crossOrigin:'true',
                                dataType:'json',
                                success:function(data,status)
                                {
                                    console.log(data);
                                    author = data[0].author_name;
                                    console.log(author);
                                    genre= data[0].format_type;
                                    console.log(genre);
                                    if(data[0].series == "")
                                    {
                                        series = "The book does not belong to any particular series";
                                    }
                                    else
                                    {
                                        series = data[0].series;
                                    }
                                    console.log(series);
                                    series_index=data[0].series_index;
                                    console.log(series_index);
                                    publisher = data[0].publisher_name;
                                    console.log(publisher);


                                }
                            });
                            return ("<p class='pop-content'> by : <span class='pop-detail'> "+ author + "</span></p><br> "+
                                        "<p class='pop-content'> Genre : <span class='pop-detail'>" + genre + "</span></p><br>" +
                                        "<p class='pop-content'> Publisher : <span class='pop-detail'> " + publisher + "</span></p><br>" +
                                        "<p class='pop-content'> Series : <span class='pop-detail'> " + series + "</span><br><br> Series Index :<span class='pop-detail'>"+series_index+" </span></p>"); 
                        }
                    });

            });
        },
        error : function(data)
        {
            $(".title").html("<h3 id='error-title'> Your search resulted empty </h3>");
            image = '../images/image-not-available.jpg';
            $("#cover-"+isbn).attr('src',image);
        }
    });

}

$(function()
{
    $("#rule").hide();
    console.log(localStorage.getItem("search-query"));
    getSearchResults();
    $("#search-button").click(function()
    {
        getSearchResultsOnClick();
    });

});