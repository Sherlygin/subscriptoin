module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
//var notifications = {
//     counter: 0,
//     count: function () {
//         this.counter++;
//     }
//};
        if(subscriber.hasOwnProperty('counter')){
            this[event].counter.obj = subscriber
            this[event].counter.events.push(handler)
        }else if(subscriber.hasOwnProperty('logs')){
            this[event].logs.obj = subscriber
            this[event].logs.events.push(handler)
        }
        return this
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if(subscriber.hasOwnProperty('counter')){
            this[event].counter.events = []
        }else if(subscriber.hasOwnProperty('logs')){
            this[event].logs.events = []
        }
        return this
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        // сохраняю объект 
        var obj1 = this[event]
        // вызываю все обработчики объекта в контексте подписчик
        for(key in this[event]){
            this[event][key].events.forEach(function(ev, i){
                ev.call(obj1[key].obj)
            })
        }
        return this
    },

    // делаю аналог объектов notification & logger
    new_notification: {
        counter: {
            obj: null,
            events: []
        } ,
        logs: {
            obj: null,
            events: []
        } ,
    }
};
