using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using models;
using Newtonsoft.Json;
namespace jsonDb
{
  public  class jsonDb
    {
        string _filePath;
        dbObject dbObject;
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

        public DTO getData()
        {
            return new DTO { posts = dbObject.editState };
        }

        public bool deletePost(post post)
        {
            bool retVal = false;
            var obj = dbObject.editState.Where(x => x.id == post.id).FirstOrDefault();
            if (obj!=null)
            {
                retVal= dbObject.editState.Remove(obj);
            }
            updateJsonFile();
            return retVal;
        }
        public bool deleteComment(commentDto commentDeleteDto)
        {
            bool retVal = false;
            var post = dbObject.editState.Where(x => x.id == commentDeleteDto.postId).FirstOrDefault();
            if (post==null)
            {
                return retVal;
            }
            var comment = post.comments.Where(x => x.id == commentDeleteDto.id).FirstOrDefault();
            if (comment!=null)
            {
                retVal= post.comments.Remove(comment);
            }
            updateJsonFile();
            return retVal;
        }

    }
}
