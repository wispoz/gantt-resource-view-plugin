Ext.define('W.plugin.ResourceViewPlugin', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.gantt_resource_view_plugin',
    tpl: '<label style="position:absolute;z-index: 100;left:{position}px;"><img title="{Name}" style=" width: 20px;margin-top: -3px; border-radius: 15px;" src="{Photo}"/></label>',
    config: {
        imageField: 'photo', // photo field in Gnt.model.Resource
        nameField: 'Name',  // name for tooltip field in Gnt.model.Resource
        dateField:'EndDate', // date field (StartDate, EndDate, or some) for tooltip field in Gnt.model.Resource
        margin: 15
    },
    constructor: function(config) {
        this.initConfig(config);
    },
    init: function (cmp) {
        this.setCmp(cmp);
        if (!(this.tpl instanceof Ext.XTemplate)) {
            this.tpl = new Ext.XTemplate(this.tpl);
        }
    },
    resourceRenderer: function(val, meta, task) {
        var me = this,
            endDateField = me.getDateField(),
            endDate = task.get(endDateField),
            nameField =  me.getNameField(),
            imageField =   me.getImageField(),
            cmp = me.getCmp(),
            position =  cmp.getSchedulingView().getCoordinateFromDate(endDate),
            resources = task.getResources();
        return Ext.Array.map(resources,function(resource){
            position += me.getMargin();
            return me.tpl.apply({
                Name: resource.get(nameField),
                Photo: resource.get(imageField),
                position: position
            });
        }).join('');
    },
    disable: function() {
        var me = this,
            cmp = me.getCmp();
        /*
        unregister resourceRenderer from queue
        */
        Ext.each(cmp.renderers, function(rend, i) {
            if(rend.fn.$name === 'resourceRenderer') {
                Ext.Array.removeAt(cmp.renderers, i);
                return false;
            }
        });
        cmp.refreshViews();
    },
    enable: function() {
        var me = this,
            cmp = me.getCmp();
        /*
        register resourceRenderer from queue
        TODO: check if already render registered.
        */
        cmp.registerRenderer(me.resourceRenderer, me);
        cmp.refreshViews();
    }
});
