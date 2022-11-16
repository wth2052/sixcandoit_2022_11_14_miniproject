import pymongo
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

# mongodb_URI = "mongodb://localhost:27017/"
# client = MongoClient(mongodb_URI)

# 방법2 - HOST, PORT

#Cluster에 연결하기
client = pymongo.MongoClient("mongodb+srv://root:3d720307@cluster0.w2bgbed.mongodb.net/?retryWrites=true&w=majority")
db = client.sixcandoit

@app.route('/')
def home():
   return render_template('index.html')
@app.route('/index2')
def home2():
   return render_template('index2.html')
@app.route('/team01')
def home3():
   return render_template('team01.html')


@app.route("/bucket", methods=["POST"])
def bucket_post():
    bucket_receive = request.form['bucket_give']

    bucket_list = list(db.bucket.find({'_id': False}))
    count = len(bucket_list) + 1

    doc = {
        'num' : count,
        'bucket' :bucket_receive,
        'done' :0
    }
    db.bucket.insert_one(doc)

    return jsonify({'msg': '등록 완료!'})

@app.route("/bucket/done", methods=["POST"])
def bucket_done():
    num_receive = request.form['num_give']
    #숫자 int로 변환
    db.bucket.update_one({'num': int(num_receive)}, {'$set':{'done': 1}})
    return jsonify({'msg': '버킷 완료!'})

@app.route("/bucket", methods=["GET"])
def bucket_get():
    bucket_list = list(db.bucket.find({}, {'_id': False}))

    return jsonify({'buckets': bucket_list})

@app.route("/guestbook", methods=["POST"])
def guestbook_post():
    name_receive = request.form["name_give"]
    comment_receive = request.form["comment_give"]

    doc = {
        'name': name_receive,
        'comment': comment_receive
    }

    db.guestbook.insert_one(doc)
    return jsonify({'msg':'응원댓글 작성 완료'})

@app.route("/guestbook", methods=["GET"])
def guestbook_get():
    comment_list = list(db.sixcandoit.find({},{'_id':False}))
    return jsonify({'comments':comment_list})



if __name__ == '__main__':
   app.run('0.0.0.0', port=3000, debug=True)