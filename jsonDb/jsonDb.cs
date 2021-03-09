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
            updateEditStateWithInitState();
        }

        private void loadData()
        {
            dbObject = JsonConvert.DeserializeObject<dbObject>(File.ReadAllText(_filePath));
            dbObject.editState.AddRange(dbObject.initialState);
            updateEditStateWithInitState();
        }

        private void updateEditStateWithInitState()
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
            var obj = dbObject.editState.Where(x => x.id == post.id).FirstOrDefault();
            if (obj!=null)
            {
                return dbObject.editState.Remove(obj);
            }
            return false;
        }
    }
}
