using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces;
using models;

namespace Ayeh_home_assignment.Controllers
{
    [Route("db")]
    [ApiController]
    public class AyehHomeAssignmentController : ControllerBase
    {
        IAyehJsonDb _db;
        public AyehHomeAssignmentController(IAyehJsonDb db)
        {
            _db = db;
        }
        [Route("getData")]
        [HttpPost]
        public ObjectResult getData(queryDto query)
        {
            var dbResult = _db.getData(query);
            return reaultCreator(dbResult);
        }
        [Route("deletePost")]
        [HttpPost]
        public ObjectResult deletePost(post post)
        {
            var dbResult = _db.deletePost(post);
            return reaultCreator(dbResult);
        }
        [HttpPost]
        [Route("deleteComment")]
        public ObjectResult deleteComment(commentDto commentDeleteDto)
        {
            var dbResult = _db.deleteComment(commentDeleteDto);
            return reaultCreator(dbResult);
        }

        [Route("reset")]
        [HttpPost]
        public ObjectResult reset()
        {
            var dbResult = _db.reset();
            return reaultCreator(dbResult);
        }

        [Route("mark")]
        [HttpPost]
        public ObjectResult markPost(post post)
        {
            var dbResult = _db.markPost(post);
            return reaultCreator(dbResult);

        }
         [Route("postById")]
        [HttpPost]
        public ObjectResult commentsById(post post)
        {
            var dbResult = _db.getPostById(post);
         
            return reaultCreator(dbResult);

        }
        [Route("addComment")]
        [HttpPost]
        public ObjectResult addComment(commentDto comment)
        {
            var dbResult = _db.addComment(comment);

            return reaultCreator(dbResult);

        }


        private ObjectResult reaultCreator<T>(T Input)
        {
            return new ObjectResult(Input);
        }
    }
}
