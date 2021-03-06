import _ from 'underscore';

import View from '../view';
import template from '../../templates/widgets/addMetricWidget.pug';
import 'girder/utilities/jquery/girderModal';

var AddMetricWidget = View.extend({
    events: {
        'submit #c-metric-add-form': function (e) {
            e.preventDefault();

            var id = this.$('#c-metric-id').val(),
                metrics = this.phase.get('metrics') || {};

            if (_.has(metrics, id)) {
                this.$('.g-validation-failed-message').text(
                    'The phase already has a metric with this identifier.');
            } else {
                this.$('.g-validation-failed-message').text('');
                this.$el.modal('hide');
                this.trigger('g:saved', {
                    id
                });
            }
        }
    },

    initialize: function (settings) {
        this.phase = settings.phase || null;
    },

    render: function () {
        var view = this;
        var modal = this.$el.html(template())
            .girderModal(this).on('shown.bs.modal', function () {
                view.$('#c-metric-id').focus();
            });

        modal.trigger($.Event('ready.girder.modal', {relatedTarget: modal}));
        this.$('#c-metric-id').focus();

        return this;
    }
});

export default AddMetricWidget;
