# gantt-resource-view-plugin
Plugin for Bryntum Gantt

```javascript
Ext.onReady(function(){

    var ganttPanel = Ext.create('Gnt.panel.Gantt', {
        plugins: [
            {
                ptype: 'gantt_resource_view_plugin',
                id:'gantt_resource_view_plugin'
            }
        ],
        tbar: [
            {
                xtype:'button',
                text:'enable',
                handler: function(btn) {
                    plugin = ganttPanel.findPlugin('gantt_resource_view_plugin').enable();
                }
            },

            {
                xtype:'button',
                text:'disable',
                handler: function(btn) {
                    plugin = ganttPanel.findPlugin('gantt_resource_view_plugin').disable();
                }
            }
        ],
        height     : 300,

        width      : 800,
        renderTo   : document.body,
        crudManager : {
            autoLoad        : true,
            transport       : {
                load : {
                    method      : 'GET',
                    url         : 'data.json'
                },
                sync : {
                    method      : 'POST',
                    url         : 'TODO'
                }
            }
        },
        columns    : [
            {
                xtype       : 'namecolumn'
            }
        ]
    });
});
```
