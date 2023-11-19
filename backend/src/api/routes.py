from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from flask import Flask, jsonify, request

from src.app.modules.dashboard.create_dashboard import DashboardCreator

dashboard = Blueprint('dashboard', __name__)

@dashboard.route("/data", methods=['POST'])
def data():
    dashboard_creator = DashboardCreator()

    try:
        dashboard_ = dashboard_creator.create_dashboard()
        return dashboard_
    except Exception as e:
        return jsonify({'error': '{}'.format(str(e))}), 500
