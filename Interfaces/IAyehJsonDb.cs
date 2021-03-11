using models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Interfaces
{
   public interface IAyehJsonDb
    {
        DTO getData(queryDto query);
        bool deletePost(post post);
       bool deleteComment(commentDto commentDeleteDto);
        bool markPost(post post);
        DTO reset();
    }
}
