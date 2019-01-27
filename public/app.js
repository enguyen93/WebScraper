$(document).ready(() => {

  $(document).on("click", "#clear", deleteArticle);
  $(document).on("click", ".scrape-new", scrapeArticle);

  $(".save").on("click", function () {
      var thisId = $(this).attr("data-id");
      saveArticle(thisId);
  });

  $(".delete").on("click", function () {
      var thisId = $(this).attr("data-id");
      delSelectedArticle(thisId);
  });

  $(".notesave").on("click", function () {
      var thisId = $(this).attr("data-id");
      console.log(thisId);
      if (!$("#noteText" + thisId).val()) {
          alert("please write something")
      } else {
          noteAdd(thisId);
      }
  });

  $(document).on('click', '.deleteNote', function () {
      var noteId = $(this).attr("data-note-id");
      var ArticleId = $(this).attr("data-Article-id");
      console.log(noteId);
      console.log(ArticleId);
      noteDelete(noteId, ArticleId)
  });

  function deleteArticle(event) {
      event.stopPropagation();
      $.ajax({
          method: "DELETE",
          url: "/api/Article"
      }).done(function (data) {
          window.location = "/"
      })
  };

  function scrapeArticle(event) {
      event.stopPropagation();

      $.ajax({
          method: "GET",
          url: "/scrape"
      }).done(function () {
          window.location = "/";
      })
  };

  function saveArticle(data) {
      $.ajax({
          method: "POST",
          url: "/api/Article/" + data,
          data: data
      }).done(function () {
          window.location = "/";
      })
  };

  function delSelectedArticle(data) {
      $.ajax({
          method: "DELETE",
          url: "/api/Article/" + data,
          data: data
      }).done(function () {
          window.location = "/saved";
      })
  };

  function noteAdd(data) {
      $.ajax({
          method: "POST",
          url: "/api/notes/" + data,
          data: {
              text: $("#noteText" + data).val(),
              article: data
          }
      }).done(function (data) {
          $("#noteText" + data).val("");
          window.location = "/saved"
      });
  };

  function noteDelete(noteId, ArticleId) {
      $.ajax({
          method: "DELETE",
          url: "/api/notes/" + noteId + "/" + ArticleId
      }).done(function (data) {
          console.log(data)
          $(".modalNote").modal("hide");
          window.location = "/saved"
      })
  }
});