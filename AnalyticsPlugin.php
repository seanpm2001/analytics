<?php

/**
 * Craft Analytics
 *
 * @package     Craft Analytics
 * @version     Version 1.0
 * @author      Benjamin David
 * @copyright   Copyright (c) 2013 - DUKT
 * @link        http://dukt.net/add-ons/craft/analytics/
 *
 */

namespace Craft;

class AnalyticsPlugin extends BasePlugin
{
    /**
     * Get Name
     */
    function getName()
    {
        return Craft::t('Analytics');
    }

    // --------------------------------------------------------------------

    /**
     * Get Version
     */
    function getVersion()
    {
        return '0.9.15';
    }

    // --------------------------------------------------------------------

    /**
     * Get Developer
     */
    function getDeveloper()
    {
        return 'Dukt';
    }

    // --------------------------------------------------------------------

    /**
     * Get Developer URL
     */
    function getDeveloperUrl()
    {
        return 'http://dukt.net/';
    }

    // --------------------------------------------------------------------

    /**
     * Has CP Section
     */
    public function hasCpSection()
    {
        return true;
    }


    public function hookRegisterCpRoutes()
    {
        return array(
            'analytics\/oauth\/(?P<page>.*)' => 'analytics/oauth/index',
        );
    }
}