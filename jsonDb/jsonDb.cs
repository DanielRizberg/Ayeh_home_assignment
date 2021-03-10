﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using models;
using Newtonsoft.Json;
namespace jsonDb
{
    public class jsonDb
    {
        string _filePath;
        dbObject dbObject;
        Dictionary<filterOp, Func<post, queryDto, bool>> filtesMap = new Dictionary<filterOp, Func<post, queryDto, bool>>
        {
            {filterOp.author,(x,y)=>x.author==y.searchVal } ,
            {filterOp.title,(x,y)=>x.title==y.searchVal } ,
        };
        Dictionary<filterOp, Func<post, object>> sortMap = new Dictionary<filterOp, Func<post, object>>
        {
            {filterOp.author,(x)=>x.author },
               {filterOp.title,(x)=>x.title },

        };
        public jsonDb(string filePath)
        {
            _filePath = filePath;
            loadData();
            updateJsonFile();
        }

        private void loadData()
        {
            dbObject = JsonConvert.DeserializeObject<dbObject>(File.ReadAllText(_filePath));
            dbObject.editState.AddRange(dbObject.initialState);
            updateJsonFile();
        }

        private void updateJsonFile()
        {
            var text = JsonConvert.SerializeObject(dbObject);
            File.WriteAllText(_filePath, text);
        }

        public DTO getData(queryDto query)
        {
            var posts = dbObject.editState;

            var filtred = posts.Where(x =>
            {
                return
                   query.searchProp != filterOp.none
                   ?
                   filtesMap[query.searchProp].Invoke(x, query)
                   :
                   true;
            }

            );
            var ordered = query.sortDir == "asc"
               ?
                   filtred.OrderBy(x =>
                   {
                       return
                       query.sortProp != filterOp.none
                       ? sortMap[query.sortProp].Invoke(x)
                       :
                       x.id;
                   }
                   ).ToList()
                   :
                   filtred.OrderByDescending(x =>
                   {
                       return
                        query.sortProp != filterOp.none
                        ? sortMap[query.sortProp].Invoke(x)
                        :
                        x.id;
                   }
                  )
                   .ToList();

            return new DTO { posts = ordered };
        }

        public bool deletePost(post post)
        {
            bool retVal = false;
            var obj = dbObject.editState.Where(x => x.id == post.id).FirstOrDefault();
            if (obj != null)
            {
                retVal = dbObject.editState.Remove(obj);
            }
            updateJsonFile();
            return retVal;
        }
        public bool deleteComment(commentDto commentDeleteDto)
        {
            bool retVal = false;
            var post = dbObject.editState.Where(x => x.id == commentDeleteDto.postId).FirstOrDefault();
            if (post == null)
            {
                return retVal;
            }
            var comment = post.comments.Where(x => x.id == commentDeleteDto.id).FirstOrDefault();
            if (comment != null)
            {
                retVal = post.comments.Remove(comment);
            }
            updateJsonFile();
            return retVal;
        }
        public bool markPost(post post)
        {
            bool retVal = false;
            var obj = dbObject.editState.Where(x => x.id == post.id).FirstOrDefault();
            if (obj != null)
            {
                obj.favorite = true;
                retVal = true;
            }
            updateJsonFile();
            return retVal;
        }

        public DTO reset()
        {
            dbObject.editState.AddRange(dbObject.initialState);
            updateJsonFile();
            return getData(new queryDto { searchProp = filterOp.none, sortProp = filterOp.none, d })
        }
    }
}
