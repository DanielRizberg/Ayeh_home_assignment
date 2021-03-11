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
        public ObjectResult getData(queryDto query)
        {
            var dbResult = _db.getData(query);
            return new ObjectResult(dbResult);
        }
        [Route("deletePost")]
        public ObjectResult deletePost(post post)
        {
            var dbResult = _db.deletePost(post);
            return new ObjectResult(dbResult);
        }
        [Route("deleteComment")]
        public ObjectResult deleteComment(commentDto commentDeleteDto)
        {
            var dbResult = _db.deleteComment(commentDeleteDto);
            return new ObjectResult(dbResult);
        }

        [Route("reset")]
        public ObjectResult reset()
        {
            var dbResult = _db.reset();
            return new ObjectResult(dbResult);
        }
    }
}
