<?php
/**
 * @link      https://dukt.net/analytics/
 * @copyright Copyright (c) Dukt
 * @license   https://github.com/dukt/analytics/blob/master/LICENSE.md
 */

namespace dukt\analytics\web\twig\variables;

use dukt\analytics\models\ReportRequestCriteria;
use dukt\analytics\Plugin as Analytics;
use nystudio107\pluginvite\variables\ViteVariableInterface;
use nystudio107\pluginvite\variables\ViteVariableTrait;

class AnalyticsVariable implements ViteVariableInterface
{
    use ViteVariableTrait;

    // Public Methods
    // =========================================================================

    /**
     * Returns a ReportRequestCriteria model that can be sent to request Google Analytics' API.
     *
     * @param array $attributes
     *
     * @return ReportRequestCriteria
     */
    public function api($attributes = null)
    {
        return new ReportRequestCriteria($attributes);
    }

    /**
     * Returns the Analytics tracking object.
     *
     *
     * @return \TheIconic\Tracking\GoogleAnalytics\Analytics
     * @throws \yii\base\InvalidConfigException
     */
    public function tracking(bool $isSsl = false, bool $isDisabled = false, array $options = [])
    {
        return Analytics::$plugin->getAnalytics()->tracking($isSsl, $isDisabled, $options);
    }
}
